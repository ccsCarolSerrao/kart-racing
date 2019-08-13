import express from 'express'
import dotenv from 'dotenv'
import { TypeormConfig } from './config/typeorm.config'
import raceRouter from './routers/race.router'

export namespace App {
    const app: express.Application = express()

    async function initialize() {
        dotenv.config()
        await TypeormConfig.createConnection()
        // race router
        app.use('/api', raceRouter)
    }

    export async function appFactory() {
        await initialize()
        return app
    }

}
