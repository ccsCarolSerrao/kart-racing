import { BaseRepositoryInterface } from './base.repository.interface'
import { PilotModel } from '../models/pilot.model'

export interface PilotRepositoryInteface extends BaseRepositoryInterface<PilotModel> {
    FindByCode(code: number): Promise<PilotModel | undefined>
    FindByIdAndRaceId(id: number, raceId: number): Promise<PilotModel | undefined>
    FindByRaceId(raceId: number): Promise<PilotModel[]>
}
