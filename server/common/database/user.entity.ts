import { userAccountTypes } from "../../common/enums/user/accoutTypes.enum";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: userAccountTypes.local })
  accountType: userAccountTypes;

  /*
   * @OneToOne(() => Passwords)
   * @JoinColumn()
   * password: Passwords;
   */
}
