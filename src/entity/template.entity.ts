import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Action } from './action.entity';

@Entity({ name: 'templates' })
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyword: string;

  @Column({ nullable: true })
  text: string;

  @ManyToOne(() => Action)
  @JoinColumn({ name: 'action_id' })
  action: Action;

  @Column({ name: 'action_id', nullable: true })
  actionId: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
