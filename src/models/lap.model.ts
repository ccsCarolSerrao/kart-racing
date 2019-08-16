import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { PilotModel } from './pilot.model'
import { RaceModel } from './race.model'

@Entity({ name: 'lap' })
export class LapModel {
    @PrimaryGeneratedColumn({ name: 'lap_id', type: 'int' })
    id?: number

    @Column({ name: 'lap_time', type: 'varchar', length: 12, nullable: false })
    time: string

    @Column({ name: 'lap_lap', type: 'int', nullable: false })
    lap: number

    @Column({ name: 'lap_lap_time', type: 'varchar', length: 12, nullable: false })
    lapTime: string

    @Column({ name: 'lap_lap_speed', type: 'decimal', nullable: false })
    lapSpeed: number

    @Column({ name: 'lap_create_date', type: 'datetime', nullable: false })
    createDate: Date

    @ManyToOne(() => PilotModel)
    @JoinColumn({ name: 'pilo_id' })
    pilot: PilotModel

    @ManyToOne(() => RaceModel)
    @JoinColumn({ name: 'race_id' })
    raceId: number

    public constructor(time: string, lap: number, lapTime: string, lapSpeed: number, pilot: PilotModel, raceId: number, createDate?: Date, id?: number) {
        this.id = id || undefined
        this.time = time
        this.lap = lap
        this.lapTime = lapTime
        this.lapSpeed = lapSpeed
        this.createDate = createDate || new Date()

        this.pilot = pilot
        this.raceId = raceId
    }
}
