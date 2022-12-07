import { userAccountTypes } from '../../common/enums/user/accoutTypes.enum'
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToOne,
} from 'typeorm'
import { PasswordsEntity } from './password.entity'

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string

    @Column({ default: userAccountTypes.local })
    accountType: userAccountTypes

    @OneToOne(() => PasswordsEntity, (password) => password.id, {
        cascade: true,
    })
    @JoinColumn()
    password: PasswordsEntity
}
