"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const todo_module_1 = require("./todo/todo.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./users/user.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = AppModule_1 = class AppModule {
    static forRoot(connOptions) {
        return {
            module: AppModule_1,
            controllers: [app_controller_1.AppController],
            imports: [todo_module_1.TodoModule, user_module_1.UserModule,
                typeorm_1.TypeOrmModule.forRoot(connOptions)],
            providers: [app_service_1.AppService],
        };
    }
};
AppModule = AppModule_1 = __decorate([
    common_1.Module({
        imports: [auth_module_1.AuthModule]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map