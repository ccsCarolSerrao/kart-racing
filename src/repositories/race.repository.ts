import { RaceRepositoryInteface } from './race.repository.interface'
import { RaceModel } from '../models/race.model'
import { Repository, getConnection } from 'typeorm';

export class RaceRepository implements RaceRepositoryInteface {
    private repository: Repository<RaceModel> = new Repository<RaceModel>()
    inicialize = () => {
        if (this.repository == undefined) {
            const connection = getConnection()
            this.repository = connection.getRepository(RaceModel)
        }
    }

    /**
     * Add a new race
     * @param newRace Race object
     */
    async Add(newRace: RaceModel): Promise<RaceModel> {
        this.inicialize()
        return await this.repository.save(newRace)
    }

    /**
     * Update an race
     * @param newRace Race object
     */
    async Update(newRace: RaceModel): Promise<RaceModel> {
        this.inicialize()
        await this.repository.update({ id: newRace.id }, newRace)
        return newRace
    }

    /**
     * Delete an race
     * @param newRace Race object
     */
    async Delete(newRace: RaceModel): Promise<RaceModel> {
        this.inicialize()
        await this.repository.delete(newRace)
        return newRace
    }

    /**
     * Get all races
     */
    async GetAll(): Promise<RaceModel[]> {
        this.inicialize()
        return await this.repository.find()
    }

    /**
     * Find an race by id
     * @param id Race id
     */
    async FindById(id: number): Promise<RaceModel | undefined> {
        this.inicialize()
        return await this.repository.findOne(id)
    }

}
