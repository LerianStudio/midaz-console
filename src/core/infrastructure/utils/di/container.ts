import { interfaces, Container as InversifyContainer } from 'inversify'

export class Container {
  public container: InversifyContainer

  constructor() {
    this.container = new InversifyContainer()
  }

  load(module: ContainerModule) {
    if (!module.hasOwnProperty('registry')) {
      throw new Error(
        `Container: module ${module} does not have a registry method`
      )
    }

    module.registry(this)
  }

  // Inversify Container Wrappers

  bind<T>(
    serviceIdentifier: interfaces.ServiceIdentifier<T>
  ): interfaces.BindingToSyntax<T> {
    return this.container.bind(serviceIdentifier)
  }

  get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
    return this.container.get(serviceIdentifier)
  }
}

export type ContainerModuleRegistry = (container: Container) => void

export class ContainerModule {
  public registry: ContainerModuleRegistry

  constructor(registry: ContainerModuleRegistry) {
    this.registry = registry
  }
}
