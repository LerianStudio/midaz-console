import { inject } from 'inversify'
import { LoggerAggregator } from '../logger/logger-aggregator'
import { snakeCase } from 'lodash'

export function LogOperation(options: {
  layer: 'application' | 'infrastructure' | 'domain'
  operation?: string
}): MethodDecorator {
  // Gets a function for injecting the service
  const ServiceInjection = inject(LoggerAggregator)

  return function (
    target,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    // Injects the service into the target
    ServiceInjection(target, 'loggerAggregator')

    // Saves the original method
    const originalMethod = descriptor.value

    // If operation is not provided, use the class name as operation
    // Example: FetchAllProductsUseCase -> fetch_all_products
    if (!options.operation) {
      options.operation = snakeCase(
        target.constructor.name.replace('UseCase', '')
      )
    }

    // Overrides the method
    descriptor.value = async function (...args: any[]) {
      const logger: LoggerAggregator = (this as any).loggerAggregator

      try {
        logger.addEvent({
          layer: options.layer,
          operation: `${options.operation}_start`,
          level: 'debug',
          message: `Starting ${options.operation}`
          // metadata: { args } //comentario aqui para remover o payload
        })

        const result = await originalMethod.apply(this, args)

        logger.addEvent({
          layer: options.layer,
          operation: `${options.operation}_success`,
          level: 'debug',
          message: `${options.operation} completed successfully`
          // metadata: { result }//comentario aqui para remover o payload
        })

        return result
      } catch (error) {
        logger.addEvent({
          layer: options.layer,
          operation: `${options.operation}_error`,
          level: 'error',
          message: `${options.operation} failed`,
          error: error as Error
        })

        throw error
      }
    }
  }
}
