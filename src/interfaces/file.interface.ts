export interface FileLineInterface {
    time: string
    pilotCode: number
    pilotName: string
    lap: number
    lapTime: string
    lapSpeed: number
}

interface FileReplaceInterface {
    regex: string
    stringToReplace: string
}

export interface FileConfigInterface {
    size: number
    replace: FileReplaceInterface[]
    flag: string
    extension: string
}

export interface FieldConfigInterface {
    field_name: string
    type: string
    description_name: string
    size: number
    regex: string
}
