import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Action } from './action.entity';

@Entity({ name: 'action_fields' })
export class ActionField {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Action)
  @JoinColumn()
  action: Action;

  @Column()
  field: string;

  @Column({ default: false })
  isPrompted: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
