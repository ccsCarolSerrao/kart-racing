import { Router } from 'express'
import { LoggerUtil } from '../utils/logger.util'
import { EnumsUtil } from '../utils/enums.util'
import { PilotController } from '../controllers/pilot.controller'

class PilotRouter {
    public pilotRouter: Router = Router()
    private pilotController: PilotController

    public constructor() {
        LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @PilotRouter/constructor()`)
        this.pilotController = new PilotController()

        this.setUp()
    }

    public setUp(): void {
        LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @PilotRouter/setUp()`)

        // insert pilot
        this.pilotRouter.route('/')
            .post(this.pilotController.Save)

        // list pilot pilot by id
        this.pilotRouter.route('/:pilotId/races/:raceId')
            .get(this.pilotController.FindByIdAndRaceId)

        // list pilot best lap pilot by id
        this.pilotRouter.route('/:pilotId/races/:raceId/best-lap')
            .get(this.pilotController.FindBestLapByIdAndRaceId)

        // list pilot speed average pilot by id
        this.pilotRouter.route('/:pilotId/races/:raceId/speed-average')
            .get(this.pilotController.FindSpeedAverageByIdAndRaceId)

        // list pilot time after winner by id
        this.pilotRouter.route('/:pilotId/races/:raceId/time-after-winner')
            .get(this.pilotController.FindTimeByIdAndRaceId)
    }
}

export default new PilotRouter().pilotRouter
