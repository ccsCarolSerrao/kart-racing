import fs from 'fs'
import { RaceModel } from '../models/race.model'
import { LapModel } from '../models/lap.model'
import { PilotModel } from '../models/pilot.model'
import { MessagesUtil } from '../utils/messages.util'
import { FileUtil } from '../utils/file.util'
import { RaceRepository } from '../repositories/race.repository'
import { FieldConfigInterface, FileLineInterface } from '../interfaces/file.interface'
import { RankinInterface, PilotRankinInterface } from '../interfaces/ranking.interface'
import { TimeUtil } from '../utils/time.util'
import { RaceUtil } from '../utils/race.util'

export class RaceService {

    /**
     * Savr race
     * @param race Object race model
     */
    public static async Save(race: RaceModel): Promise<RaceModel> {
        return await new RaceRepository().Save(race)
    }
    /**
     * Get race by file name
     * @param fileName Race file name
     */
    public static async FindByFileName(fileName: string): Promise<RaceModel | undefined> {
        return await new RaceRepository().FindByFileName(fileName)
    }

    /**
     * Find race by id
     * @param id Race id
     */
    public static async FindById(id: number): Promise<RaceModel | undefined> {
        return await new RaceRepository().FindById(id)
    }

    /**
     * Get pilots ranking by race
     * @param race Object race model
     * @param laps Object list lap model
     * @param pilots Object list pilot model
     */
    public static async GetRankingBayRaceId(race: RaceModel, laps: LapModel[], pilots: PilotModel[]): Promise<RankinInterface> {
        // Posição Chegada, Código Piloto, Nome Piloto, Qtde Voltas Completadas e Tempo Total de Prova.
        const pilotsRanking: PilotRankinInterface[] = []
        for (const pilot of pilots) {
            const pilotRank: PilotRankinInterface | any = {}

            // get pilot laps
            const pilotLaps: LapModel[] = laps.filter(x => x.pilot.id! === pilot.id!)

            // if the pilot made less then RaceUtil.LAPS_TO_WIN, he is a looser
            if (pilotLaps.length < +RaceUtil.LAPS_TO_WIN) {
                break
            }

            // count time lap by pilot
            const times: number[] = pilotLaps.map(p => TimeUtil.ConvertTimeToMilliseconds(p.lapTime))
            const totalTime: number = times.reduce((a, b) => a + b, 0)

            // loading ranking
            pilotRank.pilotCode = pilot.code
            pilotRank.pilotName = pilot.name
            pilotRank.totalLaps = pilotLaps.length
            pilotRank.totalTime = totalTime

            pilotsRanking.push(pilotRank)
        }

        // order by max lap and min time lap
        pilotsRanking.sort((t1, t2) => +t1.totalTime - +t2.totalTime)

        pilotsRanking.map((pilot, i = 0) => {
            i++
            pilot.position = i
            pilot.totalTime = TimeUtil.ConverMillisecondsToTime(+pilot.totalTime)
            return pilot
        })

        return {
            raceId: race.id!,
            raceFileName: race.fileName,
            pilotsRanking,
        } as RankinInterface

    }

    /**
     * Method to validate and transform race log file (*.log) in a Race Model object
     * (BONUS: Saving in database)
     * @param raceLogFile Race log file
     */
    public static ReadAndValidateFile(raceLogFile: Express.Multer.File): RaceModel {
        const raceLog: string = fs.readFileSync(raceLogFile.path, { encoding: 'utf8' })

        // remove dashs, spaces and tabs
        const newRaceLog: string = this.RemoveDashAndSpace(raceLog)

        const raceModel: RaceModel = new RaceModel(raceLogFile.originalname)
        const laps: LapModel[] = []

        let numberLine: number = 0
        for (const line of newRaceLog.split('\n')) {
            // count number file line
            numberLine++

            // file must have max EnumsUtil.File.MAX_LINE_SIZE
            if (line.length > FileUtil.file().size) {
                throw MessagesUtil.errFileLineExceedLimit(numberLine, line.length)
            }

            // #region Commented because error handling is required
            // // if file line not match with regex, throw error
            // if (!this.ValidateFileLineByRegex(line)) {
            //     throw MessagesUtil.errFileLineNotMatch(numberLine)
            // }
            // #endregion

            const fileLine: FileLineInterface = this.ValidateFileLineFieldsByRegex(line, numberLine)

            let pilotModel: PilotModel
            let lapModel: LapModel

            pilotModel = new PilotModel(fileLine.pilotCode, fileLine.pilotName)
            lapModel = new LapModel(fileLine.time, fileLine.lap, fileLine.lapTime, fileLine.lapSpeed, pilotModel, raceModel.id!)
            laps.push(lapModel)

        }

        raceModel.laps = laps

        console.log(raceModel)
        return raceModel
    }

    /**
     * Method to remove dash, space and tabs from race log file
     * (BONUS: Change comman to point)
     * @param raceLog Race log file
     */
    private static RemoveDashAndSpace(raceLog: string): string {
        let newFile: string = raceLog
        for (const replace of FileUtil.file().replace) {
            const fileRegex: RegExp = new RegExp(replace.regex, FileUtil.file().flag)
            newFile = newFile.replace(fileRegex, replace.stringToReplace)
        }

        return newFile
    }

    // #region Commented because error handling is required
    // /**
    //  * Method to validate race log file line by regex
    //  * @param raceLogLine Race log file
    //  */
    // private static ValidateFileLineByRegex(raceLogLine: string): boolean {
    //     // mount line regex
    //     // file fields order: TIME | PILOT_CODE  | PILOT_NAME | LAP | LAP_TIME | LAP_SPEED
    //     const regexLine = new RegExp(
    //         `${FileUtil.TimeField().regex} ${FileUtil.PilotCodeField().regex} ${FileUtil.PilotNameField().regex} ` +
    //         `${FileUtil.LapField().regex} ${FileUtil.LapTimetField().regex} ${FileUtil.LapSpeedField().regex}`,
    //         FileUtil.File().flag
    //     )

    //     // testing line
    //     return regexLine.test(raceLogLine)
    // }
    // #endregion

    /**
     * Method to validate race log file line by regex
     * @param raceLogLine Race log file
     * @param nummberLine File line number
     */
    private static ValidateFileLineFieldsByRegex(raceLogLine: string, nummberLine: number): FileLineInterface {
        // file fields order: [0] TIME | [1] PILOT_CODE | [2] PILOT_NAME | [3] LAP | [4] LAP_TIME | [5] LAP_SPEED

        // variable to mount file line object
        const fileReturn: any = {}
        // split file
        const fields: string[] = raceLogLine.split(' ')
        // get max loop
        const fieldsLength: number = fields.length - 1

        for (let position = 0; fieldsLength >= position; position++) {
            const field: string = fields[position]
            // get field config regex
            const regexConfigField: FieldConfigInterface = this.getFieldRegexConfigByPosition(position, nummberLine)

            if (!this.ValidateFieldByRegex(field, regexConfigField.regex)) {
                throw MessagesUtil.errFileLineFieldWrongValue(nummberLine, regexConfigField.description_name!)
            }

            fileReturn[regexConfigField.field_name] = (regexConfigField.type === 'number') ? +field : field
        }

        return fileReturn as FileLineInterface
    }

    /**
     * Method to validate field by field regex
     * @param field Field
     * @param regex Field config egex pattern
     */
    private static ValidateFieldByRegex(field: string, regex: string): boolean {
        const newRegex: RegExp = new RegExp(`^${regex}$`, FileUtil.file().flag)
        return newRegex.test(field)
    }

    /**
     * Method to get the regex config from fields
     * @param position Field position on field line
     * @param numberLine Field line number
     */
    private static getFieldRegexConfigByPosition(position: number, numberLine: number)
        : FieldConfigInterface {
        // file fields order: [0] TIME | [1] PILOT_CODE | [2] PILOT_NAME | [3] LAP | [4] LAP_TIME | [5] LAP_SPEED
        switch (position) {
            case 0: {
                return FileUtil.timeField()
            }
            case 1: {
                return FileUtil.pilotCodeField()
            }
            case 2: {
                return FileUtil.pilotNameField()
            }
            case 3: {
                return FileUtil.lapField()
            }
            case 4: {
                return FileUtil.lapTimetField()
            }
            case 5: {
                return FileUtil.lapSpeedField()
            }
            default: {
                throw MessagesUtil.errFileLineFieldNotExists(numberLine)
            }
        }

    }
}
