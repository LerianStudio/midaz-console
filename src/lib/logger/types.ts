export interface LogMetadata {
  userId?: string
  organizationId?: string
  [key: string]: any
}

export interface LogContext {
  layer: 'api' | 'application' | 'infrastructure' | 'domain'
  operation: string
  params?: Record<string, any>
}

export interface LogEntry {
  level: 'INFO' | 'ERROR' | 'WARN' | 'DEBUG' | 'AUDIT'
  message: string
  timestamp: number
  traceId: string
  metadata: LogMetadata
  context: LogContext
}
