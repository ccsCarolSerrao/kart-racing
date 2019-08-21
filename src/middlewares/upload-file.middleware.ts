import { Request, Response, NextFunction, RequestHandler } from 'express'
import multer from 'multer'

export namespace UploadFileMiddleware {
    export function uploadFile(req: Request, res: Response, next: NextFunction): void {
        const upload: RequestHandler = multer({ dest: 'upload/' }).single('raceLog')

        upload(req, res, (error) => {
            if (error) { throw error }

            // Everything went fine.
            next()
        })
    }
}
