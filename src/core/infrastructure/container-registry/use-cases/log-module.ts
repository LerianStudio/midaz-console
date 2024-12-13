import { Container } from 'inversify'
import { LoggerRepository } from '@/core/domain/repositories/logger/logger-repository'
import { PinoLoggerRepository } from '@/core/infrastructure/logger/pino-logger-repository'

const container = new Container()

container.bind<LoggerRepository>('LoggerRepository').to(PinoLoggerRepository)

export { container }
