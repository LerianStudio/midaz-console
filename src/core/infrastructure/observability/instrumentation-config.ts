import { Resource } from '@opentelemetry/resources'
import {
  MeterProvider,
  PeriodicExportingMetricReader
} from '@opentelemetry/sdk-metrics'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { RuntimeNodeInstrumentation } from '@opentelemetry/instrumentation-runtime-node'
import { metrics } from '@opentelemetry/api'

const metricExporter = new OTLPMetricExporter({
  url: process.env.OTEL_URL
})

const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 5000
})

const meterProvider = new MeterProvider({
  resource: new Resource({
    'service.name': 'midaz-console'
  }),
  readers: [metricReader]
})

metrics.setGlobalMeterProvider(meterProvider)

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new RuntimeNodeInstrumentation()
  ]
})
