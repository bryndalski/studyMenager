import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RefreshTokensEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    token: string;

    @Column({ nullable: false })
    refreshTokenHash: string;

    @CreateDateColumn({
        type: 'timestamp',
    })
    createdAt: Date;
}
