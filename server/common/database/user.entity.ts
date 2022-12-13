import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { PasswordsEntity } from './password.entity';
import { AccountDetails } from './accountDetails.entity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => PasswordsEntity, (password) => password.id, {
        cascade: true,
    })
    @JoinColumn()
    password: PasswordsEntity;

    @OneToOne(() => AccountDetails, ({ id }: AccountDetails) => id, {
        cascade: true,
    })
    @JoinColumn()
    accountDetails: AccountDetails;
}
