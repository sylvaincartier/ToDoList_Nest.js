"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserTable1596040855932 = void 0;
class AddUserTable1596040855932 {
    constructor() {
        this.name = 'AddUserTable1596040855932';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, "createOn" TIMESTAMP NOT NULL DEFAULT now(), "updateOn" TIMESTAMP NOT NULL DEFAULT now(), "tasksId" uuid, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createOn" TIMESTAMP NOT NULL DEFAULT now(), "todoId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_8f1817a8e973cbef5b6f455931b" FOREIGN KEY ("tasksId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_91440d017e7b30d2ac16a27d762" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_91440d017e7b30d2ac16a27d762"`);
            yield queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_8f1817a8e973cbef5b6f455931b"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TABLE "task"`);
            yield queryRunner.query(`DROP TABLE "todo"`);
        });
    }
}
exports.AddUserTable1596040855932 = AddUserTable1596040855932;
//# sourceMappingURL=1596040855932-AddUserTable.js.map