import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Execution } from './execution.entity';
import { ActionField } from './action_field.entity';

@Entity({ name: 'execution_items' })
export class ExecutionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Execution)
  @JoinColumn()
  execution: Execution;

  @ManyToOne(() => ActionField)
  @JoinColumn()
  actionField: ActionField;

  @Column()
  value: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
