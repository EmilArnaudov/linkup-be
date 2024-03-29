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
  OneToMany,
} from 'typeorm';
import { User } from './User.entity';
import { Message } from './Message.entity';

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

  @Column({ type: 'datetime' })
  start: Date;

  @Column({ type: 'datetime' })
  end: Date;

  // Each Session has one User as a host
  @ManyToOne(() => User, (user) => user.sessions)
  host: User;

  // Many Users can participate in a Session
  @ManyToMany(() => User, (user) => user.participatingSessions)
  @JoinTable()
  participants: User[];

  @OneToMany(() => Message, (message) => message.session)
  messages: Message[];

  game?: any;
}
