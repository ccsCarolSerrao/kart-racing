import { LapModel } from '../models/lap.model'
import { LapRepositoryInteface } from '../repositories/lap.repository.interface'
import { LapRepository } from '../repositories/lap.repository'

export class LapService {
    private lapRepository: LapRepositoryInteface

    constructor() {
        this.lapRepository = new LapRepository()
    }

    public async Save(lap: LapModel): Promise<LapModel> {
        return await this.lapRepository.Save(lap)
    }

    public async FindByRaceId(raceId: number): Promise<LapModel[]> {
        return await this.lapRepository.FindByRaceId(raceId)
    }
}
