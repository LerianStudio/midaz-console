import pino from 'pino'
import { LogContext, LogEntry, LogMetadata } from './types'
import { randomUUID } from 'crypto'

export class PinoLogger {
  private logger: pino.Logger

  constructor() {
    this.logger = pino({
      formatters: {
        level: (label) => ({ level: label.toUpperCase() })
      },
      timestamp: () => `,"timestamp":${Date.now()}`,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l'
        }
      },
      base: {
        env: process.env.NODE_ENV,
        version: process.env.APP_VERSION || '1.0.0'
      }
    })
  }

  private createLogEntry(
    level: LogEntry['level'],
    message: string,
    metadata: LogMetadata,
    context: LogContext
  ): LogEntry {
    return {
      level,
      message,
      timestamp: Date.now(),
      traceId: randomUUID(),
      metadata,
      context
    }
  }

  info(message: string, metadata: LogMetadata, context: LogContext) {
    const logEntry = this.createLogEntry('INFO', message, metadata, context)
    this.logger.info(logEntry)
  }

  error(message: string, metadata: LogMetadata, context: LogContext) {
    const logEntry = this.createLogEntry('ERROR', message, metadata, context)
    this.logger.error(logEntry)
  }

  warn(message: string, metadata: LogMetadata, context: LogContext) {
    const logEntry = this.createLogEntry('WARN', message, metadata, context)
    this.logger.warn(logEntry)
  }

  debug(message: string, metadata: LogMetadata, context: LogContext) {
    const logEntry = this.createLogEntry('DEBUG', message, metadata, context)
    this.logger.debug(logEntry)
  }

  audit(message: string, metadata: LogMetadata, context: LogContext) {
    const logEntry = this.createLogEntry('AUDIT', message, metadata, context)
    this.logger.info(logEntry)
  }
}
