import { MigrationInterface, QueryRunner } from 'typeorm';

export class Moscha1704093736132 implements MigrationInterface {
  name = 'Moscha1704093736132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chains" ("id" character varying NOT NULL, "network" "public"."chains_network_enum" NOT NULL DEFAULT 'mainnet', "rpcEndpoint" character varying, "restEndpoint" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_f3c6ca7e7ad0f451e3b8f3dd378" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "expiredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "chainId" character varying, CONSTRAINT "REL_8da7c5dcc470c9f78f6f37b86e" UNIQUE ("chainId"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "templates" ("id" SERIAL NOT NULL, "keyword" character varying NOT NULL, "text" character varying, "action" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_8da7c5dcc470c9f78f6f37b86e6" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_8da7c5dcc470c9f78f6f37b86e6"`,
    );
    await queryRunner.query(`DROP TABLE "templates"`);
    await queryRunner.query(`DROP TABLE "sessions"`);
    await queryRunner.query(`DROP TABLE "chains"`);
  }
}
