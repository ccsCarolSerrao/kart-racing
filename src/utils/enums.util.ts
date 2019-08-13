export namespace EnumsUtil {
    export const enum Envirionment {
        DEVELOPMENT = 'development',
        PRODUCTION = 'production',
    }

    export const enum LogLevel {
        ERROR = 'ERROR',
        WARN = 'WARN',
        INFO = 'INFORMATION',
        DEBUG = 'DEBUGGIN',
    }

    export const enum TimeField {
        HEADER = 'TIME',
        SIZE = 12,
        START = 0,
        END = 11,
    }

    export const enum PilotCodeField {
        HEADER = 'PILOT_CODE',
        SIZE = 3,
        START = 12,
        END = 14,
    }

    export const enum PilotNameField {
        HEADER = 'PILOT_NAME',
        SIZE = 40,
        START = 18,
        END = 57,
    }

    export const enum LapField {
        HEADER = 'LAP',
        SIZE = 2,
        START = 58,
        END = 59,
    }

    export const enum LapTimetField {
        HEADER = 'LAP_TIME',
        SIZE = 9,
        START = 60,
        END = 69,
    }

    export const enum LapSpeedField {
        HEADER = 'LAP_SPEED',
        SIZE = 7,
        START = 70,
        END = 76,
    }
}
