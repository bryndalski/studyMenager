import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PasswordsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    passwordHash: string;

    @Column({ default: false })
    expired: boolean;

    @Column({ type: 'timestamp', default: new Date(), nullable: false })
    lastChanged: Date;

    @Column({ type: 'boolean', default: false, nullable: false })
    needsToBeChanged: boolean;

    /*
     * @Column({ nullable: false, default: () => new Date(), type: 'timestamp' })
     * expiresAt: Date
     */

    /*
     * @Column({ type: 'timestamp', default: () => new Date(), nullable: false })
     * createdAt: Date
     */
}
