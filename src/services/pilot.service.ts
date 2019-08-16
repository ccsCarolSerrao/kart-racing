import { PilotModel } from '../models/pilot.model'
import { PilotRepository } from '../repositories/pilot.repository'

export class PilotService {
    /**
     * Save Pilot
     * @param pilot Object pilot model
     */
    public static async Save(pilot: PilotModel): Promise<PilotModel> {
        return await new PilotRepository().Save(pilot)
    }

    /**
     * Find pilot by code
     * @param code Pilot code
     */
    public static async FindByCode(code: number): Promise<PilotModel | undefined> {
        return await new PilotRepository().FindByCode(code)
    }

    /**
     * Find pilot by race id
     * @param raceId Race id
     */
    public static async FindByRaceId(raceId: number): Promise<PilotModel[]> {
        return await new PilotRepository().FindByRaceId(raceId)
    }
    public static async FindByIdAndRaceId(_id: number, _raceId: number): Promise<any> {
        return 'comming soon...'
    }

    public static async FindBestLapByIdAndRaceId(_id: number, _raceId: number): Promise<any> {
        return 'comming soon...'
    }

    public static async FindSpeedAverageByIdAndRaceId(_id: number, _raceId: number): Promise<any> {
        return 'comming soon...'
    }

    public static async FindTimeByIdAndRaceId(_id: number, _raceId: number): Promise<any> {
        return 'comming soon...'
    }
}
