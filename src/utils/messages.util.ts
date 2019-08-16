import { FileUtil } from './file.util'

export namespace MessagesUtil {
    export interface MessagesUtilInterface {
        status: number
        message: string
        result?: any
    }

    export const errServerError = () => ({
        status: 500,
        message: 'Internal Server Error - Request could not be carried out.',
    })
    export const errFileExists = () => ({
        status: 409,
        message: 'Race wasn\'t created. - File already exists!',
    })

    export const errFileLineExceedLimit = (lineNumber: number, lineLength: number) => ({
        status: 400,
        message: `File line ${lineNumber} exceeded character limit (Max: ${FileUtil.file().size} | Line: ${lineLength}).`,
    })

    export const errFileLineNotMatch = (lineNumber: number) => ({
        status: 400,
        message: `File line ${lineNumber} not macth.`,
    })

    export const errFileLineFieldNotExists = (lineNumber: number) => ({
        status: 400,
        message: `File line ${lineNumber} has some wrong field.`,
    })

    export const errFileLineFieldWrongValue = (lineNumber: number, lineField: string) => ({
        status: 400,
        message: `File line ${lineNumber} has wrong value to field '${lineField}'.`,
    })

    export const infoRaceCreated = () => ({
        status: 201,
        message: 'Race was created.',
    })
    export const infoRaceNotCreated = () => ({
        status: 500,
        message: 'Race wasn\'t created. - Something went wrong! =(',
    })

}
