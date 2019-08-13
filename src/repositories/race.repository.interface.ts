import { BaseRepositoryInterface } from './base.repository.interface'
import { RaceModel } from '../models/race.model'

export interface RaceRepositoryInteface extends BaseRepositoryInterface<RaceModel> {
    // FindByUsername(username: string): Promise<RaceModel>;
    // Promote(user: RaceModel): Promise<RaceModel>;
    // Activate(user: RaceModel): Promise<RaceModel>;
    // Inactivate(user: RaceModel): Promise<RaceModel>;
}
