# XV1 v4.0 Supreme — Technical Expansion

This directory is an isolated Python subsystem so the existing portfolio frontend remains untouched.

## Implemented prototype boundaries

- Universal AI Gateway: provider adapters, deterministic policy routing, failover, cache interface.
- Agent Orchestrator: bounded worker pool, idempotency keys, checkpoint/rollback hooks.
- Predictive Queue: durable SQLite queue with retry/backoff metadata and pluggable prioritization.
- Security: crypto-agility interfaces. No custom cryptography. PQC adapters are optional and must use vetted implementations of standardized algorithms.
- Telemetry: OpenTelemetry traces and metrics.

## Non-goals for alpha

ML routing, semantic-vector caching, blockchain audit storage, autonomous scaling, and production PQC key management are interfaces/roadmap items, not production claims.

## Run

```bash
cd xv1
python -m venv .venv
. .venv/bin/activate
pip install -e '.[test]'
pytest
```

## Acceptance criteria

1. Gateway fails over to the next eligible provider on retryable provider failure.
2. Idempotency prevents duplicate task execution inside the configured store boundary.
3. Queue persists pending work across process restart and records attempts/next-attempt time.
4. No secrets are logged; provider credentials come from environment/secret manager integration.
5. CI runs tests on Python 3.11 and 3.12.
6. Benchmark and SLO claims are added only after measured load tests.
