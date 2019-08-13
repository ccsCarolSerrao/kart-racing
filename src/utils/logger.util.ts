import { format } from 'date-fns'
import { EnumsUtil } from './enums.util'

export namespace LoggerUtil {
    export function log(logLevel: EnumsUtil.LogLevel, logMessage: string, logErrorStack?: Error): void {
        let logStructure: any
        const lodDateTime = format(new Date(), 'YYYY-MM-DD HH:mm:ss')

        if (logLevel === EnumsUtil.LogLevel.INFO) {
            logStructure = {
                DATE: lodDateTime,
                LEVEL: logLevel,
                MESSAGE: logMessage,
            }
        } else {
            logStructure = {
                'DATE': lodDateTime,
                'LEVEL': logLevel,
                'MESSAGE': logMessage,
                'STACK TRACE': logErrorStack === undefined ? '' : logErrorStack.stack,
            }
        }

        console.log(JSON.stringify(logStructure))
    }
}
