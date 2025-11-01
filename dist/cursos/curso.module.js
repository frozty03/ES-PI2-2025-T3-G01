"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const curso_entity_1 = require("./curso.entity");
const oferece_curso_instituicao_entity_1 = require("./oferece-curso-instituicao.entity");
const curso_service_1 = require("./curso.service");
const curso_controller_1 = require("./curso.controller");
const instituicao_entity_1 = require("../instituicoes/instituicao.entity");
let CursoModule = class CursoModule {
};
exports.CursoModule = CursoModule;
exports.CursoModule = CursoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                curso_entity_1.CursoEntity,
                oferece_curso_instituicao_entity_1.OfereceCursoInstituicaoEntity,
                instituicao_entity_1.InstituicaoEntity,
            ]),
        ],
        providers: [curso_service_1.CursoService],
        controllers: [curso_controller_1.CursoController],
    })
], CursoModule);
//# sourceMappingURL=curso.module.js.map