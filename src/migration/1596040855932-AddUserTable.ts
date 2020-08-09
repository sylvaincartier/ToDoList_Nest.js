import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserTable1596040855932 implements MigrationInterface {
    name = 'AddUserTable1596040855932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, "createOn" TIMESTAMP NOT NULL DEFAULT now(), "updateOn" TIMESTAMP NOT NULL DEFAULT now(), "tasksId" uuid, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createOn" TIMESTAMP NOT NULL DEFAULT now(), "todoId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_8f1817a8e973cbef5b6f455931b" FOREIGN KEY ("tasksId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_91440d017e7b30d2ac16a27d762" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_91440d017e7b30d2ac16a27d762"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_8f1817a8e973cbef5b6f455931b"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
