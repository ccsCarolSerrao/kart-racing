import { RaceFacade } from '../facades/race.facade'
import { Request, Response, NextFunction } from 'express'
import { RaceModel } from '../models/race.model'
import { MessagesUtil } from '../utils/messages.util'
import { RankinInterface } from '../interfaces/ranking.interface'
import { FileUtil } from '../utils/file.util'

export class RaceController {
    public async UploadAndSave(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const file: Express.Multer.File | undefined = req.file

            if (!file) {
                throw MessagesUtil.errFileNotSent()
            }

            // if wrong extension, throw error
            const fileExtension: string = file.originalname.split('.')[1]
            if (fileExtension !== FileUtil.file().extension) {
                throw MessagesUtil.errFileExtension()
            }

            const raceSaved: RaceModel | undefined = await new RaceFacade().UploadAndSave(file)

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

    public async GetRankingByRaceId(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const raceId: number = req.params.raceId
            const ranking: RankinInterface =  await new RaceFacade().GetRankingByRaceId(raceId)

            let message: MessagesUtil.MessagesUtilInterface
            if (ranking) {
                message = MessagesUtil.infoRackingCreated()
            } else {
                message = MessagesUtil.infoRackingNotCreated()
            }
            message.result = ranking

            return res.status(message.status).json({message: message.message, result:  message.result})
        } catch (error) {
            next(error)
        }
    }

    public async FindById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const raceId: number = req.query.raceId
            const race: RaceModel | undefined = await new RaceFacade().FindById(raceId)

            let message: MessagesUtil.MessagesUtilInterface
            if (race) {
                message = MessagesUtil.infoRaceFound()
            } else {
                message = MessagesUtil.infoRaceNotFound()
            }
            message.result = race

            return res.status(message.status).json({message: message.message, result:  message.result})
        } catch (error) {
            next(error)
        }
    }

    public FindBestLapByRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            new RaceFacade().FindBestLapByRaceId(raceId)

            return res.status(200).json({ message: 'comming soon...' })
        } catch (error) {
            next(error)
        }
    }

    public FindPilotsByRaceId(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const raceId: number = req.query.raceId
            new RaceFacade().FindPilotsByRaceId(raceId)

            return res.status(200).json({ message: 'comming soon...' })
        } catch (error) {
            next(error)
        }
    }
}
