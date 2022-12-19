import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { PasswordsEntity } from './password.entity';
import { AccountDetails } from './accountDetails.entity';
import { RefreshTokensEntity } from './refreshToken.entity';

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
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  accountDetails: AccountDetails;

  //ACCESS TOKENS
  @OneToMany(() => RefreshTokensEntity, ({ id }: RefreshTokensEntity) => id, {
    cascade: ['insert', 'remove'],
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  refreshTokens: RefreshTokensEntity[];
}
