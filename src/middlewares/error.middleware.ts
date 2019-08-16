import { NextFunction, Request, Response } from 'express'
import { LoggerUtil } from '../utils/logger.util'
import { EnumsUtil } from '../utils/enums.util'
import { MessagesUtil } from '../utils/messages.util'

export namespace ErrorMiddleware {
    export function error(err: any, _req: Request, res: Response, _next: NextFunction): Response {
        let message: MessagesUtil.MessagesUtilInterface
        if (err && err instanceof Error) {
            err.name = err.constructor.name
            for (const property of ['message', 'name']) {
                Object.defineProperty(err, property, { enumerable: true })
            }
            message =  MessagesUtil.errServerError()
            message.result = err
        } else {
            message = err
        }

        LoggerUtil.log(EnumsUtil.LogLevel.ERROR, JSON.stringify(err))
        return res.status(message.status).json({ message: message.message, result: message.result })
    }
}
