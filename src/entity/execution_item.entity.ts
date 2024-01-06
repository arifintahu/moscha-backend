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
  @JoinColumn({ name: 'execution_id' })
  execution: Execution;

  @Column({ name: 'execution_id', nullable: true })
  executionId: string;

  @ManyToOne(() => ActionField)
  @JoinColumn({ name: 'action_field_id' })
  actionField: ActionField;

  @Column({ name: 'action_field_id', nullable: true })
  actionFieldId: number;

  @Column()
  value: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
