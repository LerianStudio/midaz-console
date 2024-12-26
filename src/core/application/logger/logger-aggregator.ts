import { LoggerRepository } from '@/core/domain/repositories/logger/logger-repository'
import { AsyncLocalStorage } from 'async_hooks'
import * as crypto from 'crypto'
import { inject, injectable } from 'inversify'

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
  startTime: number
  path: string
  method: string
  metadata: Record<string, any>
  events: LogEvent[]
}

@injectable()
export class LoggerAggregator {
  private storage = new AsyncLocalStorage<RequestContext>()
  constructor(
    @inject(LoggerRepository)
    private readonly loggerRepository: LoggerRepository
  ) {
    this.storage = new AsyncLocalStorage<RequestContext>()
  }

  private shouldLogDebug(): boolean {
    return process.env.ENABLE_DEBUG === 'true'
  }

  async runWithContext<T>(
    path: string,
    method: string,
    initialMetadata: Record<string, any>,
    fn: () => Promise<T>
  ): Promise<T> {
    const context: RequestContext = {
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

  finalizeContext() {
    const context = this.getContext()

    if (context) {
      const duration = (Date.now() - context.startTime) / 1000
      const logLevel = this.determineLogLevel(context.events)

      this.loggerRepository[logLevel](
        'Request Timeline',
        {
          events: context.events.map((event) => ({
            ...event,
            timestamp: new Date(event.timestamp).toISOString()
          }))
        },
        {
          layer: 'api',
          operation: 'request_timeline',
          path: context.path,
          method: context.method,
          duration,
          metadata: context.metadata
        }
      )
    }
  }

  private determineLogLevel(events: LogEvent[]): Level {
    const levelPriority: Level[] = ['error', 'warn', 'audit', 'info', 'debug']

    for (const level of levelPriority) {
      if (events.some((event) => event.level === level)) {
        return level
      }
    }

    return 'debug'
  }

  private getContext(): RequestContext | undefined {
    return this.storage.getStore()
  }

  addEvent(event: Omit<LogEvent, 'timestamp'>) {
    const context = this.getContext()
    if (context) {
      if (event.level === 'debug' && !this.shouldLogDebug()) {
        return
      }

      const fullEvent: LogEvent = {
        timestamp: Date.now(),
        ...event
      }

      context.events.push(fullEvent)
    }
  }
}
