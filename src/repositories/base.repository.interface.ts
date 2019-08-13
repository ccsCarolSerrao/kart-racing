export interface BaseRepositoryInterface<T> {
    Add(entity: T): Promise<T>
    Update(entity: T): Promise<T>
    Delete(entity: T): Promise<T>
    FindById(id: number): Promise<T | undefined>
    GetAll(): Promise<T[]>
}
