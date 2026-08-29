from __future__ import annotations

import json
import sqlite3
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class QueueItem:
    id: int
    topic: str
    payload: dict[str, Any]
    attempts: int


class DurableQueue:
    def __init__(self, path: str | Path) -> None:
        self.path = str(path)
        self._init()

    def _connect(self) -> sqlite3.Connection:
        con = sqlite3.connect(self.path)
        con.row_factory = sqlite3.Row
        return con

    def _init(self) -> None:
        with self._connect() as con:
            con.execute("""CREATE TABLE IF NOT EXISTS queue (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                topic TEXT NOT NULL,
                payload TEXT NOT NULL,
                state TEXT NOT NULL DEFAULT 'pending',
                attempts INTEGER NOT NULL DEFAULT 0,
                next_attempt REAL NOT NULL DEFAULT 0
            )""")

    def put(self, topic: str, payload: dict[str, Any]) -> int:
        with self._connect() as con:
            cur = con.execute("INSERT INTO queue(topic,payload) VALUES (?,?)", (topic, json.dumps(payload)))
            return int(cur.lastrowid)

    def lease(self) -> QueueItem | None:
        now = time.time()
        with self._connect() as con:
            con.execute("BEGIN IMMEDIATE")
            row = con.execute("SELECT * FROM queue WHERE state='pending' AND next_attempt<=? ORDER BY id LIMIT 1", (now,)).fetchone()
            if row is None:
                return None
            con.execute("UPDATE queue SET state='leased' WHERE id=?", (row['id'],))
            return QueueItem(row['id'], row['topic'], json.loads(row['payload']), row['attempts'])

    def ack(self, item_id: int) -> None:
        with self._connect() as con:
            con.execute("DELETE FROM queue WHERE id=?", (item_id,))

    def retry(self, item_id: int, attempts: int, *, base_delay_s: float = 1.0, max_delay_s: float = 300.0) -> None:
        delay = min(max_delay_s, base_delay_s * (2 ** attempts))
        with self._connect() as con:
            con.execute("UPDATE queue SET state='pending', attempts=?, next_attempt=? WHERE id=?", (attempts + 1, time.time() + delay, item_id))
