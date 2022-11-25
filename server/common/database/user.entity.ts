import { userAccountTypes } from '../../common/enums/user/accoutTypes.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Passwords } from './password.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ default: userAccountTypes.local })
  accountType: userAccountTypes;

  @OneToOne(() => Passwords)
  @JoinColumn()
  password: Passwords;
}
