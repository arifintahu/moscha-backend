import { MigrationInterface, QueryRunner } from 'typeorm';

const actionFields = [
  {
    id: 1,
    actionId: 1,
    field: 'fromAddress',
    isPrompted: false,
  },
  {
    id: 2,
    actionId: 1,
    field: 'amount',
    isPrompted: false,
  },
  {
    id: 3,
    actionId: 1,
    field: 'denom',
    isPrompted: false,
  },
  {
    id: 4,
    actionId: 1,
    field: 'toAddress',
    isPrompted: true,
  },
];

export class ActionField1704237255276 implements MigrationInterface {
  name = 'ActionField1704237255276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const a of actionFields) {
      await queryRunner.query(
        `INSERT INTO action_fields (id, field, is_prompted, action_id) VALUES (${a.id}, '${a.field}', ${a.isPrompted}, ${a.actionId});`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM action_fields;');
  }
}
