import { Router } from 'express'
import { LoggerUtil } from '../utils/logger.util'
import { EnumsUtil } from '../utils/enums.util'
import { PilotController } from '../controllers/pilot.controller'

class PilotRouter {
    public pilotRouter = Router()

    public constructor() {
        LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @PilotRouter/constructor()`)
        this.setUp()
    }

    public setUp(): void {
        LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @PilotRouter/setUp()`)

        // insert pilot
        this.pilotRouter.route('/')
            .post(PilotController.Save)

        // list pilot pilot by id
        this.pilotRouter.route('/:pilotId/races/:raceId')
            .get(PilotController.FindByPilotIdAndRaceId)

        // list pilot best lap pilot by id
        this.pilotRouter.route('/:pilotId/races/:raceId/best-lap')
            .get(PilotController.FindBestLapByPilotIdAndRaceId)

        // list pilot speed average pilot by id
        this.pilotRouter.route('/:pilotId/races/:raceId/speed-average')
            .get(PilotController.FindSpeedAverageByPilotIdAndRaceId)

        // list pilot time after winner by id
        this.pilotRouter.route('/:pilotId/races/:raceId/time-after-winner')
            .get(PilotController.FindTimeByPilotIdAndRaceId)
    }
}

export default new PilotRouter().pilotRouter
