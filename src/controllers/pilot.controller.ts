import { Request, Response, NextFunction } from 'express'
import { PilotService } from '../services/pilot.service'

export class PilotController {
    public Save(_req: Request, res: Response, _next: NextFunction): Response | void {

        return res.status(200).json({ message: 'comming soon...' })
    }

    public FindByIdAndRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            const pilotId: number = req.query.pilotId
            new PilotService().FindByIdAndRaceId(pilotId, raceId)

            return res.status(200).json({ message: 'comming soon...' })
        } catch (error) {
            next(error)
        }
    }

    public FindBestLapByIdAndRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            const pilotId: number = req.query.pilotId
            new PilotService().FindBestLapByIdAndRaceId(pilotId, raceId)

            return res.status(200).json({ message: 'comming soon...' })
        } catch (error) {
            next(error)
        }
    }

    public FindSpeedAverageByIdAndRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            const pilotId: number = req.query.pilotId
            new PilotService().FindSpeedAverageByIdAndRaceId(pilotId, raceId)

            return res.status(200).json({ message: 'comming soon...' })
        } catch (error) {
            next(error)
        }
    }

    public FindTimeByIdAndRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            const pilotId: number = req.query.pilotId
            new PilotService().FindTimeByIdAndRaceId(pilotId, raceId)

            return res.status(200).json({ message: 'comming soon...' })
        } catch (error) {
            next(error)
        }
    }
}
