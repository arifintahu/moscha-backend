import { MigrationInterface, QueryRunner } from 'typeorm';

const templates = [
  {
    keyword: 'greeting',
    text: 'Hello! I am Moscha. Type `help` for more information',
    action: null,
  },
  {
    keyword: 'help',
    text: 'Here you can do several things like check balances of your wallet and transfer token',
    action: null,
  },
  {
    keyword: 'default',
    text: 'Command can be processed. Type `help` for more information',
    action: null,
  },
];

export class Template1704237255276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const t of templates) {
      await queryRunner.query(
        `INSERT INTO templates (keyword, text, action) VALUES ('${t.keyword}', '${t.text}', '${t.action}');`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM templates;');
  }
}
