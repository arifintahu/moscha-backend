import { MigrationInterface, QueryRunner } from 'typeorm';

export class Chain1704093892408 implements MigrationInterface {
  name = 'Chain1704093892408';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO chains (id, network) VALUES ('theta-testnet-001', 'testnet');`,
    );
    await queryRunner.query(
      `INSERT INTO chains (id, network) VALUES ('osmo-test-4', 'testnet');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM chains;');
  }
}
