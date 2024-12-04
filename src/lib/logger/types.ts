export interface LogMetadata {
  userId?: string
  organizationId?: string
  [key: string]: any
}

export interface LogContext {
  layer: 'api' | 'application' | 'infrastructure' | 'domain'
  operation: string
  params?: Record<string, any>
  component?: string
}

export interface LogEntry {
  level: 'INFO' | 'ERROR' | 'WARN' | 'DEBUG' | 'AUDIT'
  message: string
  timestamp: string
  midazId?: string
  metadata: LogMetadata
  context: LogContext
}
