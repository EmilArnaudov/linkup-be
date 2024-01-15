import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  AfterLoad,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isLive: boolean;

  @Column()
  currentPlayers: number;

  @Column()
  maxPlayers: number;

  @Column()
  gameId: number;

  @Column()
  start: string;

  @Column()
  end: string;

  // Each Session has one User as a host
  @ManyToOne(() => User, (user) => user.sessions)
  host: User;

  // Many Users can participate in a Session
  @ManyToMany(() => User, (user) => user.participatingSessions)
  @JoinTable()
  participants: User[];

  game?: any;
}
