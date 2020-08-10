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
exports.AddOwnerColumnToTodoTable1596965954892 = void 0;
class AddOwnerColumnToTodoTable1596965954892 {
    constructor() {
        this.name = 'AddOwnerColumnToTodoTable1596965954892';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "todo" ADD "ownerId" uuid`);
            yield queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_05552e862619dc4ad7ec8fc9cb8" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_05552e862619dc4ad7ec8fc9cb8"`);
            yield queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "ownerId"`);
        });
    }
}
exports.AddOwnerColumnToTodoTable1596965954892 = AddOwnerColumnToTodoTable1596965954892;
//# sourceMappingURL=1596965954892-AddOwnerColumnToTodoTable.js.map