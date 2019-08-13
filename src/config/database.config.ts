import * as path from 'path'
import { ConnectionOptions } from 'typeorm'
import { EnumsUtil } from '../utils/enums.util'
import { LoggerUtil } from '../utils/logger.util'

export namespace DatabaseConfig {

    const entitiesDir = path.resolve(__dirname, '..', 'models')
    const entitiesPath = path.resolve(entitiesDir, '*.js')

    const migrationsDir = path.resolve('src', 'migrations')
    const migrationPath = path.resolve(migrationsDir, '{*.ts, *.js}')

    export function databaseDefinition(): ConnectionOptions[] {
        LoggerUtil.log(EnumsUtil.LogLevel.INFO, `... @DatabaseConfig/databaseDefinition()`)

        if (process.env.NODE_ENV === EnumsUtil.Envirionment.DEVELOPMENT) {
            return [{
                name: 'default',
                type: 'sqlite',
                database: path.resolve(__dirname, 'db', 'kartrace.sql'),
                logging: true,
                synchronize: true,
                migrationsRun: true,
                entities: [entitiesPath],
                migrations: [migrationPath],
                cli: {
                    entitiesDir,
                    migrationsDir,
                },
            }]
        } else {
            return [{
                name: 'default',
                type: 'mysql',
                host: process.env.conn_host,
                port: 3306,
                username: process.env.conn_user,
                password: process.env.conn_password,
                database: process.env.conn_database,
                logging: true,
                synchronize: true,
                migrationsRun: true,
                entities: [entitiesPath],
                migrations: [migrationPath],
                cli: {
                    entitiesDir,
                    migrationsDir,
                },

            }]
        }
    }
}
