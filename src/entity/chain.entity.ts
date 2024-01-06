import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

export enum ChainNetwork {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

@Entity({ name: 'chains' })
export class Chain {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: ChainNetwork,
    default: ChainNetwork.MAINNET,
  })
  network: ChainNetwork;

  @Column({ nullable: true })
  rpc: string;

  @Column({ nullable: true })
  rest: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
