import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { LapModel } from './lap.model'

@Entity({ name: 'pilot' })
export class PilotModel {
    @PrimaryGeneratedColumn({ name: 'pilo_id', type: 'int' })
    id?: number

    @Column({ name: 'pilo_code', type: 'int', nullable: false })
    code: number

    @Column({ name: 'pilo_name', type: 'varchar', length: 40, nullable: false })
    name: string

    @Column({ name: 'pilo_create_date', type: 'datetime', nullable: false })
    createDate: Date

    @OneToMany(_type => LapModel, lap => lap.pilot)
    laps?: LapModel[]

    public constructor(code: number, name: string, createDate?: Date, id?: number) {
        this.id = id || undefined
        this.code = code
        this.name = name
        this.createDate = createDate || new Date()
    }
}
