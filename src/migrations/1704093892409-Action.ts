import { MigrationInterface, QueryRunner } from 'typeorm';

const actions = [
  {
    id: 1,
    action: 'MsgTransfer',
  },
];

export class Action1704093892409 implements MigrationInterface {
  name = 'Action1704093892409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const a of actions) {
      await queryRunner.query(
        `INSERT INTO actions (id, action) VALUES (${a.id}, '${a.action}');`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM actions;');
  }
}
