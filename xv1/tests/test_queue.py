from zq_xv1.queue import DurableQueue


def test_queue_persists(tmp_path):
    path = tmp_path / "q.db"
    q = DurableQueue(path)
    item_id = q.put("sync", {"x": 1})
    q2 = DurableQueue(path)
    item = q2.lease()
    assert item is not None
    assert item.id == item_id
    assert item.payload == {"x": 1}
    q2.ack(item.id)
