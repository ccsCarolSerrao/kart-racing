import { LapRepositoryInteface } from './lap.repository.interface'
import { LapModel } from '../models/lap.model'
import { Repository, getConnection } from 'typeorm'
import { PilotModel } from '../models/pilot.model'
import { RaceModel } from '../models/race.model'

export class LapRepository implements LapRepositoryInteface {
    private repository!: Repository<LapModel>

    private async inicialize(): Promise<void> {
        if (this.repository === undefined) {
            const connection = getConnection()
            this.repository = connection.getRepository(LapModel)
        }
    }

    /**
     * Add a new lap
     * @param lap Lap object
     */
    async Save(lap: LapModel): Promise<LapModel> {
        await this.inicialize()
        return await this.repository.save(lap)
    }

    /**
     * Update an lap
     * @param lap Lap object
     */
    async Update(lap: LapModel): Promise<LapModel> {
        await this.inicialize()
        // immutability
        const newLap: LapModel = Object.assign({}, lap)
        await this.repository.update({ id: newLap.id }, newLap)
        return newLap
    }

    /**
     * Delete an lap
     * @param lap Lap object
     */
    async Delete(lap: LapModel): Promise<LapModel> {
        await this.inicialize()
        // immutability
        const newLap: LapModel = Object.assign({}, lap)
        await this.repository.delete(newLap)
        return newLap
    }

    /**
     * Get all laps
     */
    async GetAll(): Promise<LapModel[]> {
        await this.inicialize()
        return await this.repository.find()
    }

    /**
     * Find an lap by id
     * @param id Lap id
     */
    async FindById(id: number): Promise<LapModel | undefined> {
        await this.inicialize()
        return await this.repository.findOneOrFail(id)
    }

    /**
     * Find an lap by race id
     * @param raceId Race id
     */
    async FindByRaceId(raceId: number): Promise<LapModel[]> {
        await this.inicialize()
        return await this.repository.find({
            where: {
                raceId,
                relations: [PilotModel, RaceModel],
            },
        })
    }

}
