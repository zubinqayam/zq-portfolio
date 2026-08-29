from __future__ import annotations

import asyncio
from dataclasses import dataclass
from typing import Any, Awaitable, Callable, Protocol


@dataclass(frozen=True)
class Task:
    id: str
    kind: str
    payload: dict[str, Any]
    idempotency_key: str


class CheckpointStore(Protocol):
    async def save(self, task_id: str, state: dict[str, Any]) -> None: ...
    async def load(self, task_id: str) -> dict[str, Any] | None: ...


class IdempotencyStore(Protocol):
    async def claim(self, key: str) -> bool: ...
    async def complete(self, key: str) -> None: ...
    async def release(self, key: str) -> None: ...


Handler = Callable[[Task], Awaitable[dict[str, Any]]]


class Orchestrator:
    def __init__(self, handlers: dict[str, Handler], idempotency: IdempotencyStore, *, concurrency: int = 8) -> None:
        self.handlers = handlers
        self.idempotency = idempotency
        self._sem = asyncio.Semaphore(concurrency)

    async def execute(self, task: Task) -> dict[str, Any]:
        if task.kind not in self.handlers:
            raise KeyError(f"No handler registered for task kind {task.kind!r}")
        claimed = await self.idempotency.claim(task.idempotency_key)
        if not claimed:
            return {"status": "duplicate", "task_id": task.id}
        try:
            async with self._sem:
                result = await self.handlers[task.kind](task)
            await self.idempotency.complete(task.idempotency_key)
            return {"status": "completed", "task_id": task.id, "result": result}
        except Exception:
            await self.idempotency.release(task.idempotency_key)
            raise
