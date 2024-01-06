import { MigrationInterface, QueryRunner } from 'typeorm';

const templates = [
  {
    keyword: 'greeting',
    text: 'Hello! I am Moscha. Type `help` for more information',
    actionId: null,
  },
  {
    keyword: 'help',
    text: 'Here you can do several things like check balances of your wallet and transfer token',
    actionId: null,
  },
  {
    keyword: 'default',
    text: 'Command can be processed. Type `help` for more information',
    actionId: null,
  },
  {
    keyword: 'transfer',
    text: '',
    actionId: 1,
  },
];

export class Template1704237255276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const t of templates) {
      if (t.actionId) {
        await queryRunner.query(
          `INSERT INTO templates (keyword, text, action_id) VALUES ('${t.keyword}', '${t.text}', '${t.actionId}');`,
        );
      } else {
        await queryRunner.query(
          `INSERT INTO templates (keyword, text) VALUES ('${t.keyword}', '${t.text}');`,
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM templates;');
  }
}
