// PinoLogger.ts

import pino, { DestinationStream, Logger, LoggerOptions } from 'pino'
import { LogContext, LogEntry, LogMetadata } from './types'
import { NextRequest } from 'next/server'
import { EventEmitter } from 'events'

export class PinoLogger {
  private static instance: PinoLogger
  private logger: Logger

  private constructor() {
    const isDebugEnabled = process.env.ENABLE_DEBUG === 'true'
    EventEmitter.defaultMaxListeners = 20
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
    context: LogContext,
    request?: NextRequest
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
      context
    }
  }

  info(
    message: string,
    metadata: LogMetadata = {},
    context: LogContext,
    request?: NextRequest
  ) {
    const logEntry = this.createLogEntry(
      'INFO',
      message,
      metadata,
      context,
      request
    )
    this.logger.info(logEntry)
  }

  error(
    message: string,
    metadata: LogMetadata = {},
    context: LogContext,
    request?: NextRequest
  ) {
    const logEntry = this.createLogEntry(
      'ERROR',
      message,
      metadata,
      context,
      request
    )
    this.logger.error(logEntry)
  }

  warn(
    message: string,
    metadata: LogMetadata = {},
    context: LogContext,
    request?: NextRequest
  ) {
    const logEntry = this.createLogEntry(
      'WARN',
      message,
      metadata,
      context,
      request
    )
    this.logger.warn(logEntry)
  }

  debug(
    message: string,
    metadata: LogMetadata = {},
    context: LogContext,
    request?: NextRequest
  ) {
    const logEntry = this.createLogEntry(
      'DEBUG',
      message,
      metadata,
      context,
      request
    )
    this.logger.debug(logEntry)
  }

  audit(
    message: string,
    metadata: LogMetadata = {},
    context: LogContext,
    request?: NextRequest
  ) {
    const logEntry = this.createLogEntry(
      'AUDIT',
      message,
      metadata,
      context,
      request
    )
    this.logger.info(logEntry)
  }
}
