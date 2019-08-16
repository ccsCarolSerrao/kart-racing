import { LapRepository } from '../repositories/lap.repository'
import { LapModel } from '../models/lap.model'

export class LapService {

    public static async Save(lap: LapModel): Promise<LapModel> {
        return await new LapRepository().Save(lap)
    }

}
