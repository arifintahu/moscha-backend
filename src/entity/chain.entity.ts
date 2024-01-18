import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

export enum ChainNetwork {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

@Entity({ name: 'chains' })
export class Chain {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

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

  @Column({ nullable: true })
  denom: string;

  @Column({ name: 'minimal_denom', nullable: true })
  minimalDenom: string;

  @Column({ nullable: true })
  decimals: number;

  @Column({ nullable: true })
  prefix: string;

  @Column({ name: 'gas_fee', nullable: true })
  gasFee: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
