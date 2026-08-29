from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol


class KeyEncapsulation(Protocol):
    algorithm: str
    def encapsulate(self, public_key: bytes) -> tuple[bytes, bytes]: ...
    def decapsulate(self, secret_key: bytes, ciphertext: bytes) -> bytes: ...


class SignatureScheme(Protocol):
    algorithm: str
    def sign(self, secret_key: bytes, message: bytes) -> bytes: ...
    def verify(self, public_key: bytes, message: bytes, signature: bytes) -> bool: ...


@dataclass(frozen=True)
class CryptoPolicy:
    kem: str = "ML-KEM-768"
    signature: str = "ML-DSA-65"
    hybrid_required: bool = True


class CryptoRegistry:
    """Crypto-agility registry. Implementations must come from vetted libraries/HSMs."""
    def __init__(self) -> None:
        self.kems: dict[str, KeyEncapsulation] = {}
        self.signatures: dict[str, SignatureScheme] = {}

    def register_kem(self, implementation: KeyEncapsulation) -> None:
        self.kems[implementation.algorithm] = implementation

    def register_signature(self, implementation: SignatureScheme) -> None:
        self.signatures[implementation.algorithm] = implementation

    def validate_policy(self, policy: CryptoPolicy) -> None:
        if policy.kem not in self.kems:
            raise RuntimeError(f"KEM implementation unavailable: {policy.kem}")
        if policy.signature not in self.signatures:
            raise RuntimeError(f"Signature implementation unavailable: {policy.signature}")
