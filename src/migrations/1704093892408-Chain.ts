import { MigrationInterface, QueryRunner } from 'typeorm';

const chains = [
  {
    id: 'theta-testnet-001',
    name: 'Cosmos Hub Testnet',
    network: 'testnet',
    rpc: 'https://rpc.sentry-02.theta-testnet.polypore.xyz',
    rest: 'https://rest.sentry-02.theta-testnet.polypore.xyz',
    denom: 'ATOM',
    minimalDenom: 'uatom',
    decimals: 6,
    prefix: 'cosmos',
    gasFee: '0.005uatom',
  },
];

export class Chain1704093892408 implements MigrationInterface {
  name = 'Chain1704093892408';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const c of chains) {
      await queryRunner.query(
        `INSERT INTO chains (id, name, network, rpc, rest, denom, minimal_denom, decimals, prefix, gas_fee) 
         VALUES ('${c.id}', '${c.name}', '${c.network}', '${c.rpc}', '${c.rest}', '${c.denom}', '${c.minimalDenom}', '${c.decimals}', '${c.prefix}', '${c.gasFee}');`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM chains;');
  }
}
