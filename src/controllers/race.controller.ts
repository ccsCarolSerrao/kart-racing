import { RaceFacade } from '../facades/race.facade'
import { Request, Response, NextFunction } from 'express'
import { RaceModel } from '../models/race.model'
import { MessagesUtil } from '../utils/messages.util'

export class RaceController {

    public static Save(_req: Request, res: Response, _next: NextFunction): Response | void {

        return res.status(200).json({ message: 'OK' })
    }

    public static async Upload(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const file: Express.Multer.File = req.file
            const raceSaved: RaceModel | undefined = await RaceFacade.Upload(file)

            let message: MessagesUtil.MessagesUtilInterface
            if (raceSaved) {
                message = MessagesUtil.infoRaceCreated()
            } else {
                message = MessagesUtil.infoRaceNotCreated()
            }
            message.result = raceSaved

            return res.status(message.status).json({message: message.message, result:  message.result})
        } catch (error) {
            next(error)
        }
    }

    public static FindById(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            RaceFacade.FindById(raceId)

            return res.status(200).json({ message: 'OK' })
        } catch (error) {
            next(error)
        }
    }

    public static FindRankingByRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            RaceFacade.FindRankingByRaceId(raceId)

            return res.status(200).json({ message: 'OK' })
        } catch (error) {
            next(error)
        }
    }

    public static FindBestLapByRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            RaceFacade.FindBestLapByRaceId(raceId)

            return res.status(200).json({ message: 'OK' })
        } catch (error) {
            next(error)
        }
    }

    public static FindPilotsByRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            RaceFacade.FindPilotsByRaceId(raceId)

            return res.status(200).json({ message: 'OK' })
        } catch (error) {
            next(error)
        }
    }
}
