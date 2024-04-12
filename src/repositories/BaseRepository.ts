export interface BaseRepository<T> {
  readonly baseUrl: string
  create(data: T): Promise<void>
  list(): Promise<T[]>
  getById(id: string): Promise<T | null>
  update(id: string, data: T): Promise<void>
  delete(id: string): Promise<void>
}
