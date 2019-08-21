import { RaceService } from '../services/race.service'
import { RaceModel } from '../models/race.model'
import { PilotModel } from '../models/pilot.model'
import { PilotService } from '../services/pilot.service'
import { LapModel } from '../models/lap.model'
import { LapService } from '../services/lap.service'
import { MessagesUtil } from '../utils/messages.util'
import { RankinInterface } from '../interfaces/ranking.interface'

export class RaceFacade {
    private raceService: RaceService
    private pilotService: PilotService
    private lapService: LapService

    constructor() {
        this.raceService = new RaceService()
        this.pilotService = new PilotService()
        this.lapService = new LapService()
    }

    /**
     * Upload and save race with pilots and laps by race log file
     * @param file Race log file (Multer middleware)
     */
    public async UploadAndSave(file: Express.Multer.File): Promise<RaceModel | undefined> {
        let race: RaceModel | undefined = await this.raceService.FindByFileName(file.originalname)
        // if file alredy saved to bd, throw error
        if (race) {
            let message: MessagesUtil.MessagesUtilInterface
            message = MessagesUtil.errFileExists()
            message.result = race

            throw message
        }

        // Validate file and fields
        race = this.raceService.ReadAndValidateFile(file)
        let raceSaved: RaceModel | undefined

        // it race and laps, save race, pilots and laps
        if (race && race.laps) {
            const raceModel: RaceModel = new RaceModel(file.originalname)
            raceSaved = await this.raceService.Save(raceModel)
            raceSaved.laps = []

            for (const lap of race.laps) {
                // find pilot by code
                let pilotSaved: PilotModel | undefined = await this.pilotService.FindByCode(lap.pilot.code)

                // if not found, insert a new pilot
                if (!pilotSaved) {
                    const pilotModel: PilotModel = new PilotModel(lap.pilot.code, lap.pilot.name)
                    pilotSaved = await this.pilotService.Save(pilotModel)
                }

                // savind lap
                const lapModel: LapModel = new LapModel(lap.time, lap.lap, lap.lapTime, lap.lapSpeed, pilotSaved, raceSaved.id!)
                const lapSaved: LapModel = await this.lapService.Save(lapModel)

                raceSaved.laps.push(lapSaved)
            }
        }
        return raceSaved
    }

    /**
     * Get pilots ranking by race isi
     * @param id Race id
     */
    public async GetRankingByRaceId(id: number): Promise<RankinInterface> {
        const raceModel: RaceModel | undefined = await this.raceService.FindById(id)

        // if not exists race, throw error
        if (!raceModel) {
            throw MessagesUtil.infoRaceNotFound()
        }

        // if not exists laps, throw error
        const lapsModel: LapModel[] = await this.lapService.FindByRaceId(id)
        if (lapsModel.length === 0) {
            throw MessagesUtil.infoLapsNotFound()
        }

        // if not exists pilots, throw error
        const pilotsModel: PilotModel[] = await this.pilotService.FindByRaceId(id)
        if (pilotsModel.length === 0) {
            throw MessagesUtil.infoPilotsNotFound()
        }

        return this.raceService.GetRankingBayRaceId(raceModel, lapsModel, pilotsModel)
    }

    /**
     * Find race by id
     * @param id Race id
     */
    public async FindById(id: number): Promise<RaceModel | undefined> {
        return await this.raceService.FindById(id)
    }

    public async FindBestLapByRaceId(_id: number): Promise<any> {
        return 'comming soon...'
    }

    public async FindPilotsByRaceId(_id: number): Promise<any> {
        return 'comming soon...'
    }
}
