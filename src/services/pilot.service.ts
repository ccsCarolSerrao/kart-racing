import { PilotModel } from '../models/pilot.model'
import { PilotRepository } from '../repositories/pilot.repository'
import { PilotRepositoryInteface } from '../repositories/pilot.repository.interface'

export class PilotService {
    private pilotRepository: PilotRepositoryInteface

    constructor() {
        this.pilotRepository = new PilotRepository()
    }

    /**
     * Save Pilot
     * @param pilot Object pilot model
     */
    public async Save(pilot: PilotModel): Promise<PilotModel> {
        return await this.pilotRepository.Save(pilot)
    }

    /**
     * Find pilot by code
     * @param code Pilot code
     */
    public async FindByCode(code: number): Promise<PilotModel | undefined> {
        return await this.pilotRepository.FindByCode(code)
    }

    /**
     * Find pilot by race id
     * @param raceId Race id
     */
    public async FindByRaceId(raceId: number): Promise<PilotModel[]> {
        return await this.pilotRepository.FindByRaceId(raceId)
    }

    public async FindByIdAndRaceId(_id: number, _raceId: number): Promise<any> {
        return 'comming soon...'
    }

    public async FindBestLapByIdAndRaceId(_id: number, _raceId: number): Promise<any> {
        return 'comming soon...'
    }

    public async FindSpeedAverageByIdAndRaceId(_id: number, _raceId: number): Promise<any> {
        return 'comming soon...'
    }

    public async FindTimeByIdAndRaceId(_id: number, _raceId: number): Promise<any> {
        return 'comming soon...'
    }
}
