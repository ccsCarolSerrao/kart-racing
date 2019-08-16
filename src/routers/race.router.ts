import { Router } from 'express'
import { LoggerUtil } from '../utils/logger.util'
import { EnumsUtil } from '../utils/enums.util'
import { RaceController } from '../controllers/race.controller'
import multer from 'multer'

class RaceRouter {
    public raceRouter = Router()
    private upload: multer.Instance = multer({ dest: `upload/` })
    public constructor() {
        LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @RaceRouter/constructor()`)
        this.setUp()
    }

    public setUp(): void {
        LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @RaceRouter/setUp()`)

        // insert race
        this.raceRouter.route('/')
            .post(RaceController.Save)

        // insert race by uploading file
        this.raceRouter.route('/upload')
            .post(
                this.upload.single('raceLog'),
                RaceController.Upload)

        // find race by id
        this.raceRouter.route('/:raceId')
            .get(RaceController.FindById)

        // get race ranking
        this.raceRouter.route('/:raceId/ranking')
            .get(RaceController.FindRankingByRaceId)

        // get race best lap
        this.raceRouter.route('/:raceId/best-lap')
            .get(RaceController.FindBestLapByRaceId)

        // list race pilots
        this.raceRouter.route('/:raceId/pilots')
            .get(RaceController.FindPilotsByRaceId)
    }
}

export default new RaceRouter().raceRouter
