import pino from 'pino'
import { ILogger } from '@/core/domain/logger/logger.interface'

export class PinoLogger implements ILogger {
  private logger: pino.Logger

  constructor() {
    this.logger = pino({
      level: process.env.LOG_LEVEL || 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l o',
          ignore: 'pid,hostname'
        }
      },
      base: {
        env: process.env.NODE_ENV,
        version: process.env.APP_VERSION || '1.0.0'
      }
    })
  }

  private enrichMetadata(metadata?: Record<string, any>): Record<string, any> {
    return {
      timestamp: new Date().toISOString(),
      ...metadata
    }
  }

  debug(message: string, metadata?: Record<string, any>): void {
    this.logger.debug(this.enrichMetadata(metadata), message)
  }

  info(message: string, metadata?: Record<string, any>): void {
    this.logger.info(this.enrichMetadata(metadata), message)
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.logger.warn(this.enrichMetadata(metadata), message)
  }

  error(message: string, error?: Error, metadata?: Record<string, any>): void {
    this.logger.error(
      this.enrichMetadata({
        ...metadata,
        error: error
          ? { message: error.message, stack: error.stack }
          : undefined
      }),
      message
    )
  }

  audit(message: string, metadata?: Record<string, any>): void {
    this.logger.info(
      this.enrichMetadata({ ...metadata, type: 'AUDIT' }),
      message
    )
  }
}
