import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'race' })
export class RaceModel {
    @PrimaryGeneratedColumn({ name: 'race_id', type: 'int' })
    id?: number

    @Column({ name: 'race_time', type: 'varchar', length: 12, nullable: false })
    time: string

    @Column({ name: 'race_pilot_code', type: 'int', nullable: false })
    pilotCode: number

    @Column({ name: 'race_pilot_name', type: 'varchar', length: 40, nullable: false })
    pilotName: string

    @Column({ name: 'race_lap', type: 'int', nullable: false })
    lap: number

    @Column({ name: 'race_lap_time', type: 'varchar', length: 12, nullable: false })
    lapTime: string

    @Column({ name: 'race_lap_speed', type: 'double', nullable: false })
    lapSpeed: number

    @Column({ name: 'race_create_date', type: 'datetime', nullable: false })
    createDate: Date


    public constructor(time: string, pilotCode: number, pilotName: string, lap: number, lapTime: string, lapSpeed: number, createDate?: Date, id?: number) {
        this.time = time
        this.pilotCode = pilotCode
        this.pilotName = pilotName
        this.lap = lap
        this.lapTime = lapTime
        this.lapSpeed = lapSpeed
        this.createDate = createDate || new Date()
        this.id = id || 0
    }
}