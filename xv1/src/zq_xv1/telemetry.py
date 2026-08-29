from __future__ import annotations

from opentelemetry import metrics, trace
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.trace import TracerProvider


def configure_telemetry(service_name: str = "zq-xv1") -> tuple[trace.Tracer, metrics.Meter]:
    if not isinstance(trace.get_tracer_provider(), TracerProvider):
        trace.set_tracer_provider(TracerProvider())
    if not isinstance(metrics.get_meter_provider(), MeterProvider):
        metrics.set_meter_provider(MeterProvider())
    return trace.get_tracer(service_name), metrics.get_meter(service_name)
