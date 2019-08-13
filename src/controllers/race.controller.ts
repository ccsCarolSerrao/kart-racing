import { RaceService } from '../services/race.service'
import { Request, Response, NextFunction } from 'express';

export class RaceController {
    public static raceController: RaceService  = new RaceService()

    public static save(_req: Request, res: Response, _next: NextFunction): Response | void {

        return res.status(200).json({message: 'OK'})
    }

    public static findById(_req: Request, res: Response, _next: NextFunction): Response | void {

        return res.status(200).json({message: 'OK'})
    }

    public static ranking(_req: Request, res: Response, _next: NextFunction): Response | void {

        return res.status(200).json({message: 'OK'})
    }
}
