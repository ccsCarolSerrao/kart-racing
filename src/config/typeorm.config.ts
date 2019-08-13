import { createConnections } from 'typeorm'
import { EnumsUtil } from '../utils/enums.util'
import { DatabaseConfig } from './database.config'
import { LoggerUtil } from '../utils/logger.util'

export namespace TypeormConfig {
    export async function createConnection() {
        LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @TypeormConfig/createConnection()`)
        try {
            const connection = await createConnections(DatabaseConfig.databaseDefinition())
            for (const conn of connection) {
                await conn.runMigrations()
            }
        } catch (err) {
            LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @TypeormConfig/createConnection()`, err)
            return err
        }
    }
}
