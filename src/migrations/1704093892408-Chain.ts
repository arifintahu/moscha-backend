import { MigrationInterface, QueryRunner } from 'typeorm';

const chains = [
  {
    id: 'theta-testnet-001',
    network: 'testnet',
    rpc: 'https://rpc.sentry-02.theta-testnet.polypore.xyz',
    rest: 'https://rest.sentry-02.theta-testnet.polypore.xyz',
  },
  {
    id: 'osmo-test-5',
    network: 'testnet',
    rpc: 'https://rpc.osmotest5.osmosis.zone',
    rest: 'https://lcd.osmotest5.osmosis.zone',
  },
];

export class Chain1704093892408 implements MigrationInterface {
  name = 'Chain1704093892408';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const c of chains) {
      await queryRunner.query(
        `INSERT INTO chains (id, network, rpc, rest) VALUES ('${c.id}', '${c.network}', '${c.rpc}', '${c.rest}');`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM chains;');
  }
}
