import { BaseRepositoryInterface } from './base.repository.interface'
import { LapModel } from '../models/lap.model'

export interface LapRepositoryInteface extends BaseRepositoryInterface<LapModel> {
    // FindByUsername(username: string): Promise<LapModel>;
    // Promote(user: LapModel): Promise<LapModel>;
    // Activate(user: LapModel): Promise<LapModel>;
    // Inactivate(user: LapModel): Promise<LapModel>;
}
