import { userAccountTypes } from '../enums/user/accoutTypes.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class AccountDetails {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: false,
    default: false,
  })
  isEmailConfirmed: boolean;

  @Column({ default: userAccountTypes.local })
  accountType: userAccountTypes;
}
