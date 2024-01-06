import { MigrationInterface, QueryRunner } from 'typeorm';

export class Moscha1704093736132 implements MigrationInterface {
  name = 'Moscha1704093736132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "actions" ("id" SERIAL NOT NULL, "action" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_7bfb822f56be449c0b8adbf83cf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "action_fields" ("id" SERIAL NOT NULL, "field" character varying NOT NULL, "isPrompted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "actionId" integer, CONSTRAINT "PK_27cf53061bd4193e3461133730f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chains" ("id" character varying NOT NULL, "network" "public"."chains_network_enum" NOT NULL DEFAULT 'mainnet', "rpcEndpoint" character varying, "restEndpoint" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_f3c6ca7e7ad0f451e3b8f3dd378" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "expiredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "chainId" character varying, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "executions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "sessionId" uuid, CONSTRAINT "PK_703e64e0ef651986191844b7b8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "execution_items" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "executionId" uuid, "actionFieldId" integer, CONSTRAINT "PK_24d5fbffcf7724ee0f424c74f2d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "templates" ("id" SERIAL NOT NULL, "keyword" character varying NOT NULL, "text" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "actionId" integer, CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "action_fields" ADD CONSTRAINT "FK_dedf504e573cdac6a9becb57245" FOREIGN KEY ("actionId") REFERENCES "actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_8da7c5dcc470c9f78f6f37b86e6" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" ADD CONSTRAINT "FK_6c81b6448311775355becce8d3d" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_items" ADD CONSTRAINT "FK_534fe8217680601ee3bc11fba08" FOREIGN KEY ("executionId") REFERENCES "executions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_items" ADD CONSTRAINT "FK_27634b7ad7df9320f2c8bcd34b9" FOREIGN KEY ("actionFieldId") REFERENCES "action_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "templates" ADD CONSTRAINT "FK_ad23f16555b1c0426943e67179f" FOREIGN KEY ("actionId") REFERENCES "actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "templates" DROP CONSTRAINT "FK_ad23f16555b1c0426943e67179f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_items" DROP CONSTRAINT "FK_27634b7ad7df9320f2c8bcd34b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_items" DROP CONSTRAINT "FK_534fe8217680601ee3bc11fba08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" DROP CONSTRAINT "FK_6c81b6448311775355becce8d3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_8da7c5dcc470c9f78f6f37b86e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "action_fields" DROP CONSTRAINT "FK_dedf504e573cdac6a9becb57245"`,
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
