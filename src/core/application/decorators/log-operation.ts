import { RequestContextManager } from '@/lib/logger/request-context'

export function LogOperation(options: {
  layer: 'application' | 'infrastructure' | 'domain'
  operation: string
}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      try {
        RequestContextManager.addEvent({
          layer: options.layer,
          operation: `${options.operation}_start`,
          level: 'info',
          message: `Starting ${options.operation}`,
          metadata: { args }
        })

        const result = await originalMethod.apply(this, args)

        RequestContextManager.addEvent({
          layer: options.layer,
          operation: `${options.operation}_success`,
          level: 'info',
          message: `${options.operation} completed successfully`,
          metadata: { result }
        })

        return result
      } catch (error) {
        RequestContextManager.addEvent({
          layer: options.layer,
          operation: `${options.operation}_error`,
          level: 'error',
          message: `${options.operation} failed`,
          error: error as Error
        })
        throw error
      }
    }

    return descriptor
  }
}
