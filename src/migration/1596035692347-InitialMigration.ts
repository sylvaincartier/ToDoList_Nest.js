import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1596035692347 implements MigrationInterface {
    name = 'InitialMigration1596035692347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createOn" TIMESTAMP NOT NULL DEFAULT now(), "todoId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "tasksId" uuid`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_8f1817a8e973cbef5b6f455931b" FOREIGN KEY ("tasksId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_91440d017e7b30d2ac16a27d762" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_91440d017e7b30d2ac16a27d762"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_8f1817a8e973cbef5b6f455931b"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "tasksId"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
