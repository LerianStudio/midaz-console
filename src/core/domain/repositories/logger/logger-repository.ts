import { LogContext, LogEntry } from '@/lib/logger/types'
import { LogMetadata } from '@/lib/logger/types'

export abstract class LoggerRepository {
  abstract info(
    message: string,
    context: LogContext,
    metadata?: LogMetadata
  ): void
  abstract error(
    message: string,
    context: LogContext,
    metadata?: LogMetadata
  ): void
  abstract warn(
    message: string,
    context: LogContext,
    metadata?: LogMetadata
  ): void
  abstract debug(
    message: string,
    context: LogContext,
    metadata?: LogMetadata
  ): void
  abstract audit(
    message: string,
    context: LogContext,
    metadata?: LogMetadata
  ): void
}
