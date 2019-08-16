import { Request, Response, NextFunction } from 'express'
import { PilotService } from '../services/pilot.service'

export class PilotController {
    public static Save(_req: Request, res: Response, _next: NextFunction): Response | void {

        return res.status(200).json({ message: 'comming soon...' })
    }

    public static FindByIdAndRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            const pilotId: number = req.query.pilotId
            PilotService.FindByIdAndRaceId(pilotId, raceId)

            return res.status(200).json({ message: 'comming soon...' })
        } catch (error) {
            next(error)
        }
    }

    public static FindBestLapByIdAndRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            const pilotId: number = req.query.pilotId
            PilotService.FindBestLapByIdAndRaceId(pilotId, raceId)

            return res.status(200).json({ message: 'comming soon...' })
        } catch (error) {
            next(error)
        }
    }

    public static FindSpeedAverageByIdAndRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            const pilotId: number = req.query.pilotId
            PilotService.FindSpeedAverageByIdAndRaceId(pilotId, raceId)

            return res.status(200).json({ message: 'comming soon...' })
        } catch (error) {
            next(error)
        }
    }

    public static FindTimeByIdAndRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            const pilotId: number = req.query.pilotId
            PilotService.FindTimeByIdAndRaceId(pilotId, raceId)

            return res.status(200).json({ message: 'comming soon...' })
        } catch (error) {
            next(error)
        }
    }
}
