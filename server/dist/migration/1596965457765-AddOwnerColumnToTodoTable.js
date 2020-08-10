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
exports.AddOwnerColumnToTodoTable1596965457765 = void 0;
class AddOwnerColumnToTodoTable1596965457765 {
    constructor() {
        this.name = 'AddOwnerColumnToTodoTable1596965457765';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" ADD "ownerId" uuid`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6c19ad3671f901796d5a7395e3e" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6c19ad3671f901796d5a7395e3e"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "ownerId"`);
        });
    }
}
exports.AddOwnerColumnToTodoTable1596965457765 = AddOwnerColumnToTodoTable1596965457765;
//# sourceMappingURL=1596965457765-AddOwnerColumnToTodoTable.js.map