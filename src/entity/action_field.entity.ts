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
  @JoinColumn({ name: 'action_id' })
  action: Action;

  @Column({ name: 'action_id', nullable: true })
  actionId: number;

  @Column()
  field: string;

  @Column({ name: 'is_prompted', default: false })
  isPrompted: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
