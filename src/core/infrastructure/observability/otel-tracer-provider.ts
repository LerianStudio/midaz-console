import { Span, trace, Tracer } from '@opentelemetry/api'
import { injectable } from 'inversify'

@injectable()
export class OtelTracerProvider {
  private otelTracer: Tracer

  constructor() {
    this.otelTracer = trace.getTracer('midaz-console')
  }

  public startCustomSpan(spanName: string): Span {
    const span = this.otelTracer.startSpan(spanName)
    return span
  }

  public endCustomSpan(span: Span): void {
    span.end()
  }
}
