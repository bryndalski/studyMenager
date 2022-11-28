import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Passwords {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    passwordHash: string

    @Column()
    expired: boolean

    @Column()
    lastChanged: Date

    @Column({
        nullable: false,
        default: () => new Date(),
        type: 'timestamp',
    })
    expiresAt: Date

    /*
     * @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"))
     * createdAt: string
     */
}
