import { RaceRepositoryInteface } from './race.repository.interface'
import { RaceModel } from '../models/race.model'
import { Repository, getConnection } from 'typeorm'

export class RaceRepository implements RaceRepositoryInteface {
    private repository!: Repository<RaceModel>

    private async inicialize(): Promise<void> {
        if (this.repository === undefined) {
            const connection = getConnection()
            this.repository = connection.getRepository(RaceModel)
        }
    }

    /**
     * Add a new race
     * @param race Race object
     */
    async Save(race: RaceModel): Promise<RaceModel> {
        await this.inicialize()
        return await this.repository.save(race)
    }

    /**
     * Update an race
     * @param race Race object
     */
    async Update(race: RaceModel): Promise<RaceModel> {
        await this.inicialize()
        // immutability
        const newRace: RaceModel = Object.assign({}, race)
        await this.repository.update({ id: newRace.id }, newRace)
        return newRace
    }

    /**
     * Delete an race
     * @param race Race object
     */
    async Delete(race: RaceModel): Promise<RaceModel> {
        await this.inicialize()
        // immutability
        const newRace: RaceModel = Object.assign({}, race)
        await this.repository.delete(newRace)
        return newRace
    }

    /**
     * Get all races
     */
    async GetAll(): Promise<RaceModel[]> {
        await this.inicialize()
        return await this.repository.find()
    }

    /**
     * Find an race by id
     * @param id Race id
     */
    async FindById(id: number): Promise<RaceModel | undefined> {
        await this.inicialize()
        return await this.repository.findOne(id)
    }

    /**
     * Find an race by filename
     * @param fileName Race file name
     */
    async FindByFileName(fileName: string): Promise<RaceModel | undefined> {
        await this.inicialize()
        return await this.repository.findOne({ where: { fileName } })
    }

}
