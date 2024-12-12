import pino, { Logger, LoggerOptions } from 'pino'
import { LogContext, LogEntry, LogMetadata } from './types'

export class PinoLogger {
  private static instance: PinoLogger
  private logger: Logger

  private constructor() {
    const isDebugEnabled = process.env.ENABLE_DEBUG === 'true'
    const loggerOptions: LoggerOptions = {
      level: isDebugEnabled ? 'debug' : 'info',
      formatters: {
        level: (label) => ({ level: label.toUpperCase() })
      },
      timestamp: pino.stdTimeFunctions.isoTime,
      base: {
        env: process.env.NODE_ENV || 'production',
        version: process.env.APP_VERSION || '1.0.0'
      }
    }

    if (process.env.NODE_ENV === 'development') {
      loggerOptions.transport = {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l'
        }
      }
    }

    this.logger = pino(loggerOptions)
  }

  static getInstance(): PinoLogger {
    if (!PinoLogger.instance) {
      PinoLogger.instance = new PinoLogger()
    }
    return PinoLogger.instance
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
      timestamp: new Date().toISOString(),
      metadata,
      context
    }
  }

  info(message: string, metadata: LogMetadata = {}, context: LogContext) {
    const logEntry = this.createLogEntry('INFO', message, metadata, context)
    this.logger.info(logEntry)
  }

  error(message: string, metadata: LogMetadata = {}, context: LogContext) {
    const logEntry = this.createLogEntry('ERROR', message, metadata, context)
    this.logger.error(logEntry)
  }

  warn(message: string, metadata: LogMetadata = {}, context: LogContext) {
    const logEntry = this.createLogEntry('WARN', message, metadata, context)
    this.logger.warn(logEntry)
  }

  debug(message: string, metadata: LogMetadata = {}, context: LogContext) {
    const logEntry = this.createLogEntry('DEBUG', message, metadata, context)
    this.logger.debug(logEntry)
  }

  audit(message: string, metadata: LogMetadata = {}, context: LogContext) {
    const logEntry = this.createLogEntry('AUDIT', message, metadata, context)
    this.logger.info(logEntry)
  }
}
