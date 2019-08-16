import { BaseRepositoryInterface } from './base.repository.interface'
import { LapModel } from '../models/lap.model'

export interface LapRepositoryInteface extends BaseRepositoryInterface<LapModel> {
    FindByRaceId(raceId: number): Promise<LapModel[]>
}
