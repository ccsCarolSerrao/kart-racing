import { FileConfigInterface, FieldConfigInterface } from '../Interfaces/file.interface'

export namespace FileUtil {
    export const file = (): FileConfigInterface => ({
        size: 69,
        replace: [
            {
                regex: '[^a-zA-Z0-9.,:]+[\\s\\s]+',
                stringToReplace: ' ',
            },
            {
                regex: '[,]+',
                stringToReplace: '.',
            },
        ],
        flag: 'gm',
        extension: 'log'
    })

    export const timeField = (): FieldConfigInterface => ({
        field_name: 'time',
        type: 'string',
        description_name: 'time',
        size: 12,
        regex: '(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]:[0-5][0-9].[0-9]{3}',
    })

    export const pilotCodeField = (): FieldConfigInterface => ({
        field_name: 'pilotCode',
        type: 'number',
        description_name: 'pilot code',
        size: 3,
        regex: '[0-9]{3}',
    })

    export const pilotNameField = (): FieldConfigInterface => ({
        field_name: 'pilotName',
        type: 'string',
        description_name: 'pilot name',
        size: 30,
        regex: '[a-zA-Z].[a-zA-Z]{1,30}',
    })

    export const lapField = (): FieldConfigInterface => ({
        field_name: 'lap',
        type: 'number',
        description_name: 'lap',
        size: 2,
        regex: '([1-9][0-9]|[1-9])',
    })

    export const lapTimetField = (): FieldConfigInterface => ({
        field_name: 'lapTime',
        type: 'string',
        description_name: 'lap time',
        size: 9,
        regex: '([0-9]|[1-5][0-9]):[0-5][0-9].[0-9]{3}',
    })

    export const lapSpeedField = (): FieldConfigInterface => ({
        field_name: 'lapSpeed',
        type: 'number',
        description_name: 'lap speed',
        size: 7,
        regex: '[0-9]{1,3}.[0-9]{1,3}',
    })
}
