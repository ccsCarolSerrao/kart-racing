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

    export const errFileExtension = () => ({
        status: 409,
        message: 'Race wasn\'t created. - File extesion must be "*.log"!',
    })

    export const errFileNotSent = () => ({
        status: 409,
        message: 'Race wasn\'t created. - File wasn\'t sent. Make sure you added file in "raceLog" field!',
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
    export const infoRaceNotFound = () => ({
        status: 200,
        message: 'Race wasn\'t found.',
    })
    export const infoRaceFound = () => ({
        status: 404,
        message: 'Race was found.',
    })

    export const infoLapsNotFound = () => ({
        status: 404,
        message: 'Laps weren\'t found.',
    })

    export const infoPilotsNotFound = () => ({
        status: 404,
        message: 'Pilots weren\'t found.',
    })

    export const infoRackingCreated = () => ({
        status: 201,
        message: 'Racking was created.',
    })
    export const infoRackingNotCreated = () => ({
        status: 500,
        message: 'Racking wasn\'t created. - Something went wrong! =(',

    })
}
