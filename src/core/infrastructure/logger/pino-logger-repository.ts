import pino, { Logger, LoggerOptions } from 'pino'
import { injectable } from 'inversify'
import {
  LogContext,
  LogMetadata,
  LogEntry
} from '@/core/domain/entities/log-entities'
import { LoggerRepository } from '@/core/domain/repositories/logger/logger-repository'
import pretty from 'pino-pretty'

@injectable()
export class PinoLoggerRepository implements LoggerRepository {
  private logger: Logger

  constructor() {
    this.logger = this.initializeLogger()
  }

  private initializeLogger(): Logger {
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
      return pino(
        loggerOptions,
        pretty({
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l'
        })
      )
    }

    console.log('logger pino repository', loggerOptions)

    return pino(loggerOptions)
  }

  private createLogEntry(
    level: LogEntry['level'],
    message: string,
    metadata: LogMetadata | undefined,
    context: LogContext
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata: metadata || {},
      context
    }
  }

  info(message: string, context: LogContext, metadata?: LogMetadata): void {
    const logEntry = this.createLogEntry('INFO', message, metadata, context)
    this.logger.info(logEntry)
  }

  error(message: string, context: LogContext, metadata?: LogMetadata): void {
    const logEntry = this.createLogEntry('ERROR', message, metadata, context)
    this.logger.error(logEntry)
  }

  warn(message: string, context: LogContext, metadata?: LogMetadata): void {
    const logEntry = this.createLogEntry('WARN', message, metadata, context)
    this.logger.warn(logEntry)
  }

  debug(message: string, context: LogContext, metadata?: LogMetadata): void {
    const logEntry = this.createLogEntry('DEBUG', message, metadata, context)
    this.logger.debug(logEntry)
  }

  audit(message: string, context: LogContext, metadata?: LogMetadata): void {
    const logEntry = this.createLogEntry('AUDIT', message, metadata, context)
    this.logger.info(logEntry)
  }
}
