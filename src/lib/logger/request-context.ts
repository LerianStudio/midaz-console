import { AsyncLocalStorage } from 'async_hooks'
import * as crypto from 'crypto'
import { PinoLogger } from './pino-logger'

type Layer = 'api' | 'application' | 'infrastructure' | 'domain'
type Level = 'info' | 'error' | 'warn' | 'debug' | 'audit'

interface LogEvent {
  timestamp: number
  layer: Layer
  operation: string
  level: Level
  message: string
  metadata?: Record<string, any>
  error?: Error
}

interface RequestContext {
  requestId: string
  startTime: number
  path: string
  method: string
  metadata: Record<string, any>
  events: LogEvent[]
}

export class RequestContextManager {
  private static storage = new AsyncLocalStorage<RequestContext>()
  private static logger = PinoLogger.getInstance()

  private static shouldLogDebug(): boolean {
    return process.env.ENABLE_DEBUG === 'true'
  }

  static async runWithContext<T>(
    path: string,
    method: string,
    initialMetadata: Record<string, any>,
    fn: () => Promise<T>
  ): Promise<T> {
    const context: RequestContext = {
      requestId: crypto.randomUUID(),
      startTime: Date.now(),
      path,
      method,
      metadata: initialMetadata,
      events: []
    }

    return this.storage.run(context, async () => {
      try {
        const result = await fn()

        this.finalizeContext()
        return result
      } catch (error) {
        this.addEvent({
          layer: 'api',
          operation: 'request_error',
          level: 'error',
          message: 'Request failed',
          error: error instanceof Error ? error : new Error(String(error))
        })
        this.finalizeContext()
        throw error
      }
    })
  }

  private static finalizeContext() {
    const context = this.getContext()
    if (context) {
      const duration = Date.now() - context.startTime

      // if (process.env.ENABLE_REQUEST_TIMELINE === 'true') {
      this.logger.info(
        'Request Timeline',
        {
          requestId: context.requestId,
          path: context.path,
          method: context.method,
          duration,
          metadata: context.metadata,
          events: context.events.map((event) => ({
            ...event,
            timestamp: new Date(event.timestamp).toISOString()
          }))
        },
        {
          layer: 'api',
          operation: 'request_timeline'
        }
      )
      // }
    }
  }

  static getContext(): RequestContext | undefined {
    return this.storage.getStore()
  }

  static addEvent(event: Omit<LogEvent, 'timestamp'>) {
    const context = this.getContext()
    if (context) {
      if (event.level === 'debug' && !this.shouldLogDebug()) {
        return
      }

      const fullEvent: LogEvent = {
        timestamp: Date.now(),
        ...event
      }

      // switch (event.level) {
      //   case 'debug':
      //     this.logger.debug(
      //       event.message,
      //       { eventData: fullEvent, requestId: context.requestId },
      //       { layer: event.layer, operation: event.operation }
      //     )
      //     break
      //   case 'info':
      //     this.logger.info(
      //       event.message,
      //       { eventData: fullEvent, requestId: context.requestId },
      //       { layer: event.layer, operation: event.operation }
      //     )
      //     break
      //   case 'error':
      //     this.logger.error(
      //       event.message,
      //       {
      //         eventData: fullEvent,
      //         requestId: context.requestId,
      //         error: event.error
      //       },
      //       { layer: event.layer, operation: event.operation }
      //     )
      //     break
      //   case 'warn':
      //     this.logger.warn(
      //       event.message,
      //       { eventData: fullEvent, requestId: context.requestId },
      //       { layer: event.layer, operation: event.operation }
      //     )
      //     break
      //   case 'audit':
      //     this.logger.audit(
      //       event.message,
      //       { eventData: fullEvent, requestId: context.requestId },
      //       { layer: event.layer, operation: event.operation }
      //     )
      //     break
      // }

      context.events.push(fullEvent)
    }
  }

  static updateMetadata(metadata: Partial<RequestContext['metadata']>) {
    const context = this.getContext()
    if (context) {
      context.metadata = {
        ...context.metadata,
        ...metadata
      }
    }
  }
}
