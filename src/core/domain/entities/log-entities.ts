export interface LogMetadata {
  userId?: string
  organizationId?: string
  [key: string]: any
}

export interface LogContext {
  // layer: 'api' | 'application' | 'infrastructure' | 'domain'
  // path: string
  // method: string
  // duration: number
  // operation: string
  // metadata: LogMetadata
  // params?: Record<string, any>
  // component?: string
  events?: Record<string, any>
}

export interface LogEntry {
  level: 'INFO' | 'ERROR' | 'WARN' | 'DEBUG' | 'AUDIT'
  message: string
  timestamp: string
  midazId?: string
  metadata: LogMetadata
  context: LogContext
}
