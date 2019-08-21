import { Router } from 'express'
import { LoggerUtil } from '../utils/logger.util'
import { EnumsUtil } from '../utils/enums.util'
import { RaceController } from '../controllers/race.controller'
import { UploadFileMiddleware } from '../middlewares/upload-file.middleware'

class RaceRouter {
    public raceRouter: Router = Router()
    private raceController: RaceController

    public constructor() {
        LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @RaceRouter/constructor()`)
        this.raceController = new RaceController()

        this.setUp()
    }

    public setUp(): void {
        LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @RaceRouter/setUp()`)

        // insert race by uploading file
        this.raceRouter.route('/upload')
            .post(
                UploadFileMiddleware.uploadFile,
                this.raceController.UploadAndSave)

        // find race by id
        this.raceRouter.route('/:raceId')
            .get(this.raceController.FindById)

        // get race ranking
        this.raceRouter.route('/:raceId/ranking')
            .get(this.raceController.GetRankingByRaceId)

        // get race best lap
        this.raceRouter.route('/:raceId/best-lap')
            .get(this.raceController.FindBestLapByRaceId)

        // list race pilots
        this.raceRouter.route('/:raceId/pilots')
            .get(this.raceController.FindPilotsByRaceId)
    }
}

export default new RaceRouter().raceRouter
