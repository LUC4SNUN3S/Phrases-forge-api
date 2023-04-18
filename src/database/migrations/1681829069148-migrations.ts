import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1681829069148 implements MigrationInterface {
  name = 'migrations1681829069148';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "phrases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "content" text NOT NULL, "phrase_master" character varying(100) NOT NULL, "phrase_hash" character varying(32) NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_f7ffbe7963e64d31d215f4126e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(30) NOT NULL, "alias" character varying(30) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "phrases" ADD CONSTRAINT "FK_9c745d11d5838122008bc8ed0ec" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "phrases" DROP CONSTRAINT "FK_9c745d11d5838122008bc8ed0ec"`,
    );
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "phrases"`);
  }
}
