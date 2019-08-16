export namespace TimeUtil {
    /**
     * Convert lap time type of string to millisenconds number
     * @param time Lap time (MM:SS:mmm)
     */
    export function ConvertTimeToMilliseconds(timeLap: string): number {
        const time: string[] = timeLap.split(new RegExp('[:|.]'))

        // minutes * 60000 | seconds * 10000 | milliseconds
        return (+time[0] * 60000) + (+time[1] * 1000) + +time[2]
    }

    /**
     * Convert millisenconds number to lap time type of string
     * @millisecondsLap time Lap time in milleseconds
     */
    export function ConverMillisecondsToTime(millisecondsLap: number): string {
        const minutes: number = Math.trunc(millisecondsLap / 60000)
        const seconds: number = Math.trunc((millisecondsLap % 60000) / 1000)
        const milliseconds: number = millisecondsLap % 1000

        return `${minutes}:${seconds}.${milliseconds}`
    }
}
