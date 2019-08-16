import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { LapModel } from './lap.model'

@Entity({ name: 'race' })
export class RaceModel {
    @PrimaryGeneratedColumn({ name: 'race_id', type: 'int' })
    id?: number

    @Column({ name: 'race_file_name', type: 'varchar', length: 50, nullable: false })
    fileName: string

    @Column({ name: 'race_create_date', type: 'datetime', nullable: false })
    createDate: Date

    @OneToMany(_type => LapModel, lap => lap.raceId)
    laps?: LapModel[]

    public constructor(fileName: string, createDate?: Date, id?: number) {
        this.id = id || undefined
        this.fileName = fileName
        this.createDate = createDate || new Date()
    }
}
