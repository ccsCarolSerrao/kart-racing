import { PilotRepositoryInteface } from './pilot.repository.interface'
import { PilotModel } from '../models/pilot.model'
import { Repository, getConnection } from 'typeorm'
import { LapModel } from '../models/lap.model'
import { RaceModel } from '../models/race.model'

export class PilotRepository implements PilotRepositoryInteface {
    private repository!: Repository<PilotModel>

    private async inicialize(): Promise<void> {
        if (this.repository === undefined) {
            const connection = getConnection()
            this.repository = connection.getRepository(PilotModel)
        }
    }

    /**
     * Add a new pilot
     * @param pilot Pilot object
     */
    async Save(pilot: PilotModel): Promise<PilotModel> {
        await this.inicialize()
        return await this.repository.save(pilot)
    }

    /**
     * Update a pilot
     * @param pilot Pilot object
     */
    async Update(pilot: PilotModel): Promise<PilotModel> {
        await this.inicialize()
        // immutability
        const newPilot: PilotModel = Object.assign({}, pilot)
        await this.repository.update({ id: newPilot.id }, newPilot)
        return newPilot
    }

    /**
     * Delete a pilot
     * @param pilot Pilot object
     */
    async Delete(pilot: PilotModel): Promise<PilotModel> {
        await this.inicialize()
        // immutability
        const newPilot: PilotModel = Object.assign({}, pilot)
        await this.repository.delete(newPilot)
        return newPilot
    }

    /**
     * Get all pilots
     */
    async GetAll(): Promise<PilotModel[]> {
        await this.inicialize()
        return await this.repository.find()
    }

    /**
     * Find a pilot by id
     * @param id Pilot id
     */
    async FindById(id: number): Promise<PilotModel | undefined> {
        await this.inicialize()
        return await this.repository.findOne(id)
    }

    /**
     * Find a pilot by id and race id
     * @param pilotId Pilot Id
     * @param raceId Race Id
     */
    async FindByCode(code: number): Promise<PilotModel | undefined> {
        await this.inicialize()
        return await this.repository.findOne({ where: { code } })
    }

    /**
     * Find a pilot by id and race id
     * @param pilotId Pilot Id
     * @param raceId Race Id
     */
    async FindByIdAndRaceId(id: number, raceId: number): Promise<PilotModel | undefined> {
        await this.inicialize()
        return await this.repository.findOne({ where: { id, raceId } })
    }

    /**
     * Find a pilots by race id
     * @param raceId Race Id
     */
    async FindByRaceId(raceId: number): Promise<PilotModel[]> {
        await this.inicialize()
        return await this.repository.find({ where: { raceId , relations: [LapModel, RaceModel] }})
    }

}
