"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituicaoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const turma_entity_1 = require("./turma.entity");
const turma_service_1 = require("./turma.service");
const turma_controller_1 = require("./turma.controller");
let InstituicaoModule = class InstituicaoModule {
};
exports.InstituicaoModule = InstituicaoModule;
exports.InstituicaoModule = InstituicaoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([turma_entity_1.TurmaEntity])],
        providers: [turma_service_1.TurmaService],
        controllers: [turma_controller_1.TurmasController],
        exports: [turma_service_1.TurmaService],
    })
], InstituicaoModule);
//# sourceMappingURL=turma.module.js.map