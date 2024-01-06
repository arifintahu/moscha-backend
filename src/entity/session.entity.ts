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

  @ManyToOne(() => Chain)
  @JoinColumn({ name: 'chain_id' })
  chain: Chain;

  @Column({ name: 'chain_id', nullable: true })
  chainId: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column({
    name: 'expired_at',
    type: 'timestamptz',
  })
  expiredAt: Date;
}
