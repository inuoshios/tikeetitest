import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration0011713671399900 implements MigrationInterface {
    name = 'InitialMigration0011713671399900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tickets" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "full_name" character varying NOT NULL,
                "unique_identifier" character varying NOT NULL,
                "status" smallint NOT NULL DEFAULT '0',
                "expires_at" TIMESTAMP NOT NULL,
                "created_on" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_on" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "payments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "amount" integer NOT NULL,
                "ticket_id" uuid NOT NULL,
                "unique_payment_reference" character varying NOT NULL,
                "created_on" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_on" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_aac3e9d7b82ecaeb355f2f4e0d" ON "payments" ("ticket_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "payments"
            ADD CONSTRAINT "FK_aac3e9d7b82ecaeb355f2f4e0d1" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE
            SET NULL ON UPDATE
            SET NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payments" DROP CONSTRAINT "FK_aac3e9d7b82ecaeb355f2f4e0d1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_aac3e9d7b82ecaeb355f2f4e0d"
        `);
        await queryRunner.query(`
            DROP TABLE "payments"
        `);
        await queryRunner.query(`
            DROP TABLE "tickets"
        `);
    }

}
