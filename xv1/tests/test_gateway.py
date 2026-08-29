import pytest

from zq_xv1.gateway import Gateway, ModelRequest, ModelResponse, ProviderError


class FakeProvider:
    capabilities = frozenset({"chat"})
    def __init__(self, name: str, fail: bool = False):
        self.name = name
        self.fail = fail
    async def generate(self, request):
        if self.fail:
            raise ProviderError("temporary")
        return ModelResponse(text="ok", provider=self.name, model="fake")


@pytest.mark.asyncio
async def test_gateway_failover():
    gw = Gateway([FakeProvider("a", True), FakeProvider("b")])
    response = await gw.generate(ModelRequest(messages=({"role":"user","content":"hi"},)))
    assert response.provider == "b"
