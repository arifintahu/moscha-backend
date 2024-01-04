import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chain } from './chain.entity';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  expiredAt: Date;

  @ManyToOne(() => Chain)
  @JoinColumn()
  chain: Chain;
}
