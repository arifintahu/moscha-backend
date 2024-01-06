import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Session } from './session.entity';

@Entity({ name: 'executions' })
export class Execution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Session)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @Column({ name: 'session_id', nullable: true })
  sessionId: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
