import { Span, trace, Tracer } from '@opentelemetry/api'
import { OtelTracerProvider } from './otel-tracer-provider'

jest.mock('@opentelemetry/api', () => ({
  trace: {
    getTracer: jest.fn().mockReturnValue({
      startSpan: jest.fn().mockReturnValue({
        end: jest.fn()
      })
    })
  }
}))

describe('OtelTracerProvider', () => {
  let otelTracerProvider: OtelTracerProvider
  let mockTracer: Tracer
  let mockSpan: Span

  beforeEach(() => {
    otelTracerProvider = new OtelTracerProvider()
    mockTracer = trace.getTracer('midaz-console')
    mockSpan = mockTracer.startSpan('test-span')
  })

  it('should initialize otelTracer in the constructor', () => {
    expect(trace.getTracer).toHaveBeenCalledWith('midaz-console')
  })

  it('should start a custom span', () => {
    const spanName = 'test-span'
    const span = otelTracerProvider.startCustomSpan(spanName)
    expect(mockTracer.startSpan).toHaveBeenCalledWith(spanName)
    expect(span).toBe(mockSpan)
  })

  it('should end a custom span', () => {
    otelTracerProvider.endCustomSpan(mockSpan)
    expect(mockSpan.end).toHaveBeenCalled()
  })
})