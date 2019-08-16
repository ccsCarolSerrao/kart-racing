import { RaceService } from '../services/race.service'
import { RaceModel } from '../models/race.model'
import { PilotModel } from '../models/pilot.model'
import { PilotService } from '../services/pilot.service'
import { LapModel } from '../models/lap.model'
import { LapService } from '../services/lap.service'
import { MessagesUtil } from '../utils/messages.util'

export class RaceFacade {
    public static raceController: RaceService = new RaceService()

    public static async Save(race: RaceModel): Promise<RaceModel > {
        return await RaceService.Save(race)
    }

    public static async Upload(file: Express.Multer.File): Promise<RaceModel | undefined> {
        let race: RaceModel | undefined = await RaceService.FindByFileName(file.originalname)
        // if file alredy exists, throw error
        if (race) {
            let message: MessagesUtil.MessagesUtilInterface
            message = MessagesUtil.errFileExists()
            message.result = race

            throw message
        }
        race = RaceService.ReadFile(file)
        let raceSaved: RaceModel | undefined

        if (race && race.laps) {
            const raceModel: RaceModel = new RaceModel(file.originalname)
            raceSaved = await RaceService.Save(raceModel)
            raceSaved.laps = []

            for (const lap of race.laps) {
                // find pilot by code
                let pilotSaved: PilotModel | undefined = await PilotService.FindByCode(lap.pilot.code)

                // if not found, insert a new pilot
                if (!pilotSaved) {
                    const pilotModel: PilotModel = new PilotModel(lap.pilot.code, lap.pilot.name)
                    pilotSaved = await PilotService.Save(pilotModel)
                }

                const lapModel: LapModel = new LapModel(lap.time, lap.lap, lap.lapTime, lap.lapSpeed, pilotSaved, raceSaved.id!)
                const lapSaved: LapModel = await LapService.Save(lapModel)

                raceSaved.laps.push(lapSaved)
            }
        }

        return raceSaved
    }

    public static async FindById(id: number): Promise<RaceModel | undefined > {
        return await RaceService.FindById(id)
    }

    public static async FindRankingByRaceId(_id: number): Promise<any> {
        return 'comming soon...'
    }

    public static async FindBestLapByRaceId(_id: number): Promise<any> {
        return 'comming soon...'
    }

    public static async FindPilotsByRaceId(_id: number): Promise<any> {
        return 'comming soon...'
    }
}
