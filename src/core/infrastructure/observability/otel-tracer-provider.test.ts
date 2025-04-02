// import { OtelTracerProvider, spanData } from './otel-tracer-provider'
// import { Span, trace, Tracer, SpanStatusCode } from '@opentelemetry/api'

// jest.mock('@opentelemetry/api', () => ({
//   trace: {
//     getTracer: jest.fn()
//   }
// }))

// describe('OtelTracerProvider', () => {
//   let tracerProvider: OtelTracerProvider
//   let mockTracer: Tracer
//   let mockSpan: Span

//   beforeEach(() => {
//     mockSpan = {
//       setAttributes: jest.fn(),
//       setStatus: jest.fn(),
//       end: jest.fn()
//     } as unknown as Span

//     mockTracer = {
//       startSpan: jest.fn().mockReturnValue(mockSpan)
//     } as unknown as Tracer
//     ;(trace.getTracer as jest.Mock).mockReturnValue(mockTracer)

//     process.env.ENABLE_TELEMETRY = 'true'
//     tracerProvider = new OtelTracerProvider()
//   })

//   afterEach(() => {
//     jest.clearAllMocks()
//     delete process.env.ENABLE_TELEMETRY
//   })

//   it('should initialize telemetry when ENABLE_TELEMETRY is true', () => {
//     expect(trace.getTracer).toHaveBeenCalledWith('midaz-console')
//   })

//   it('should start a custom span when telemetry is enabled', () => {
//     const spanName = 'test-span'
//     tracerProvider.startCustomSpan(spanName)

//     expect(mockTracer.startSpan).toHaveBeenCalledWith(spanName)
//   })

//   it('should not start a custom span when telemetry is disabled', () => {
//     process.env.ENABLE_TELEMETRY = 'false'
//     tracerProvider = new OtelTracerProvider()

//     tracerProvider.startCustomSpan('test-span')

//     expect(mockTracer.startSpan).not.toHaveBeenCalled()
//   })

//   it('should end a custom span and set attributes and status', () => {
//     const spanData: spanData = {
//       attributes: { key: 'value' },
//       status: { code: SpanStatusCode.OK }
//     }

//     tracerProvider.startCustomSpan('test-span')
//     tracerProvider.endCustomSpan(spanData)

//     expect(mockSpan.setAttributes).toHaveBeenCalledWith(spanData.attributes)
//     expect(mockSpan.setStatus).toHaveBeenCalledWith(spanData.status)
//     expect(mockSpan.end).toHaveBeenCalled()
//   })

//   it('should end a custom span with default status when no spanData is provided', () => {
//     tracerProvider.startCustomSpan('test-span')
//     tracerProvider.endCustomSpan()

//     expect(mockSpan.setAttributes).toHaveBeenCalledWith({})
//     expect(mockSpan.setStatus).toHaveBeenCalledWith({
//       code: SpanStatusCode.UNSET
//     })
//     expect(mockSpan.end).toHaveBeenCalled()
//   })

//   it('should not end a span if telemetry is disabled', () => {
//     process.env.ENABLE_TELEMETRY = 'false'
//     tracerProvider = new OtelTracerProvider()

//     tracerProvider.endCustomSpan()

//     expect(mockSpan.end).not.toHaveBeenCalled()
//   })
// })
