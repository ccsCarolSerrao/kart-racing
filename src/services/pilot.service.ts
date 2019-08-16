import { PilotModel } from '../models/pilot.model'
import { PilotRepository } from '../repositories/pilot.repository'

export class PilotService {

    public static async Save(pilot: PilotModel): Promise<PilotModel> {
        return await new PilotRepository().Save(pilot)
    }

    public static async FindByCode(code: number): Promise<PilotModel | undefined> {
        return await new PilotRepository().FindByCode(code)
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
