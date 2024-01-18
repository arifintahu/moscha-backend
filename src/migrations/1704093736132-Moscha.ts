import { MigrationInterface, QueryRunner } from 'typeorm';

export class Moscha1704093736132 implements MigrationInterface {
  name = 'Moscha1704093736132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "actions" ("id" SERIAL NOT NULL, "action" character varying NOT NULL, "url" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_7bfb822f56be449c0b8adbf83cf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "action_fields" ("id" SERIAL NOT NULL, "action_id" integer, "field" character varying NOT NULL, "is_prompted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_27cf53061bd4193e3461133730f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chains" ("id" character varying NOT NULL, "name" character varying NOT NULL, "network" "public"."chains_network_enum" NOT NULL DEFAULT 'mainnet', "rpc" character varying, "rest" character varying, "denom" character varying, "minimal_denom" character varying, "decimals" integer, "prefix" character varying, "gas_fee" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_f3c6ca7e7ad0f451e3b8f3dd378" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "chain_id" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "expired_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "executions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "session_id" uuid, "is_completed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_703e64e0ef651986191844b7b8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "execution_items" ("id" SERIAL NOT NULL, "execution_id" uuid, "action_field_id" integer, "value" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_24d5fbffcf7724ee0f424c74f2d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "templates" ("id" SERIAL NOT NULL, "keyword" character varying NOT NULL, "text" character varying, "action_id" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "action_fields" ADD CONSTRAINT "FK_44cc0a9fb25ca067bfddcaebbfc" FOREIGN KEY ("action_id") REFERENCES "actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_1384ec199fa2aaaea657357fe2b" FOREIGN KEY ("chain_id") REFERENCES "chains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" ADD CONSTRAINT "FK_8ce22be3725d620dc6b15801091" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_items" ADD CONSTRAINT "FK_b5a5896f510a26b766e996dfd6a" FOREIGN KEY ("execution_id") REFERENCES "executions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_items" ADD CONSTRAINT "FK_ba4396015043e9f0c16aed2e919" FOREIGN KEY ("action_field_id") REFERENCES "action_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "templates" ADD CONSTRAINT "FK_002f933d1a44211a23e10b973ae" FOREIGN KEY ("action_id") REFERENCES "actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "templates" DROP CONSTRAINT "FK_002f933d1a44211a23e10b973ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_items" DROP CONSTRAINT "FK_ba4396015043e9f0c16aed2e919"`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_items" DROP CONSTRAINT "FK_b5a5896f510a26b766e996dfd6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" DROP CONSTRAINT "FK_8ce22be3725d620dc6b15801091"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_1384ec199fa2aaaea657357fe2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "action_fields" DROP CONSTRAINT "FK_44cc0a9fb25ca067bfddcaebbfc"`,
    );
    await queryRunner.query(`DROP TABLE "templates"`);
    await queryRunner.query(`DROP TABLE "execution_items"`);
    await queryRunner.query(`DROP TABLE "executions"`);
    await queryRunner.query(`DROP TABLE "sessions"`);
    await queryRunner.query(`DROP TABLE "chains"`);
    await queryRunner.query(`DROP TABLE "action_fields"`);
    await queryRunner.query(`DROP TABLE "actions"`);
  }
}
