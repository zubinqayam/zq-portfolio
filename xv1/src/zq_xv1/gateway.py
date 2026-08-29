from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Protocol, Sequence


class ProviderError(RuntimeError):
    def __init__(self, message: str, *, retryable: bool = True) -> None:
        super().__init__(message)
        self.retryable = retryable


@dataclass(frozen=True)
class ModelRequest:
    messages: tuple[dict[str, str], ...]
    capability: str = "chat"
    max_cost_usd: float | None = None
    max_latency_ms: int | None = None
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class ModelResponse:
    text: str
    provider: str
    model: str
    latency_ms: float | None = None
    usage: dict[str, int] = field(default_factory=dict)


class Provider(Protocol):
    name: str
    capabilities: frozenset[str]
    async def generate(self, request: ModelRequest) -> ModelResponse: ...


class Cache(Protocol):
    async def get(self, key: str) -> ModelResponse | None: ...
    async def set(self, key: str, value: ModelResponse, ttl_s: int) -> None: ...


class Router(Protocol):
    def rank(self, request: ModelRequest, providers: Sequence[Provider]) -> Sequence[Provider]: ...


class DeterministicRouter:
    """Stable baseline router. Replace only after routing telemetry proves an ML router is better."""
    def rank(self, request: ModelRequest, providers: Sequence[Provider]) -> Sequence[Provider]:
        eligible = [p for p in providers if request.capability in p.capabilities]
        return tuple(eligible)


class Gateway:
    def __init__(self, providers: Sequence[Provider], router: Router | None = None) -> None:
        self.providers = tuple(providers)
        self.router = router or DeterministicRouter()

    async def generate(self, request: ModelRequest) -> ModelResponse:
        ranked = self.router.rank(request, self.providers)
        if not ranked:
            raise ProviderError(f"No provider supports capability={request.capability}", retryable=False)

        failures: list[str] = []
        for provider in ranked:
            try:
                return await provider.generate(request)
            except ProviderError as exc:
                failures.append(f"{provider.name}: {exc}")
                if not exc.retryable:
                    raise
        raise ProviderError("All eligible providers failed: " + "; ".join(failures))
