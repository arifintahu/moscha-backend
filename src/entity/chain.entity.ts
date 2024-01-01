import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

export enum ChainNetwork {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

@Entity({ name: 'chain' })
export class Chain {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: ChainNetwork,
    default: ChainNetwork.MAINNET,
  })
  network: ChainNetwork;

  @Column()
  rpcEndpoint: string;

  @Column()
  restEndpoint: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
