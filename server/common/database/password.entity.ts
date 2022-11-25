import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Passwords {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  passwordHash: string;

  @Column()
  expired: boolean;

  @Column()
  lastChanged: Date;
}
