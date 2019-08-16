import { BaseRepositoryInterface } from './base.repository.interface'
import { RaceModel } from '../models/race.model'

export interface RaceRepositoryInteface extends BaseRepositoryInterface<RaceModel> {
    FindByFileName(fileName: string): Promise<RaceModel | undefined>
}
