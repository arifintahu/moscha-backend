import { MigrationInterface, QueryRunner } from 'typeorm';

const chains = [
  {
    id: 'theta-testnet-001',
    network: 'testnet',
  },
  {
    id: 'osmo-test-4',
    network: 'testnet',
  },
];

export class Chain1704093892408 implements MigrationInterface {
  name = 'Chain1704093892408';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const c of chains) {
      await queryRunner.query(
        `INSERT INTO chains (id, network) VALUES ('${c.id}', '${c.network}');`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM chains;');
  }
}
