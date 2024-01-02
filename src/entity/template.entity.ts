import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'templates' })
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyword: string;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  action: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
