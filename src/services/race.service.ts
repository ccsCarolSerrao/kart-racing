import { RaceRepository } from '../repositories/race.repository'
import { RaceRepositoryInteface } from '../repositories/race.repository.interface'

export class RaceService {
    public static raceController: RaceRepositoryInteface  = new RaceRepository()
}
