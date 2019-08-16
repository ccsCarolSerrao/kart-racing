import express from 'express'
import dotenv from 'dotenv'
import { TypeormConfig } from './config/typeorm.config'
import raceRouter from './routers/race.router'
import pilotRouter from './routers/pilot.router'
import { ErrorMiddleware } from './middlewares/error.middleware'

export namespace App {
    const app: express.Application = express()

    async function initialize() {
        dotenv.config()
        await TypeormConfig.createConnection()
        // race router
        app.use('/api/v1/races', raceRouter)
        app.use('/api/v1/pilots', pilotRouter)

        // middleware
        app.use(ErrorMiddleware.error)
    }

    export async function appFactory() {
        await initialize()
        return app
    }

}
