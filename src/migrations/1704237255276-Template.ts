import { MigrationInterface, QueryRunner } from 'typeorm';

const templates = [
  {
    keyword: 'greeting',
    text: 'Hello world!',
    action: null,
  },
  {
    keyword: 'help',
    text: 'What I can help you',
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
