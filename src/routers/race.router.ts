import { Router } from 'express'
import { LoggerUtil } from '../utils/logger.util'
import { EnumsUtil } from '../utils/enums.util'
import { RaceController } from '../controllers/race.controller'

class RaceRouter {
    public raceRouter = Router()

    public constructor() {
        LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @RaceRouter/constructor()`)
        this.setUp()
    }

    public setUp(): void {
        LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @RaceRouter/setUp()`)

        this.raceRouter.route('/v1/races')
            .post(RaceController.save)

        this.raceRouter.route('/v1/races/:raceId')
            .post(RaceController.findById)

        this.raceRouter.route('/v1/races/:raceId/ranking')
            .post(RaceController.ranking)

        this.raceRouter.route('/v1/races/:raceId/pilots')
            .post(RaceController.ranking)

        this.raceRouter.route('/v1/races/:raceId/pilots/:pilotId')
            .post(RaceController.ranking)
    }
}

export default new RaceRouter().raceRouter
