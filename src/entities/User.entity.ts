import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Session } from './Session.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  isActive: boolean;

  @Column({ select: false })
  password: string;

  // One User can have many Sessions
  @OneToMany(() => Session, (session) => session.host)
  sessions: Session[];

  // Many Users can participate in many Sessions
  @ManyToMany(() => Session, (session) => session.participants)
  participatingSessions: Session[];
}
