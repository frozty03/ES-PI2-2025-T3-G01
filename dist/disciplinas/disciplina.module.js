"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplinaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const disciplinas_entity_1 = require("./disciplinas.entity");
const curso_entity_1 = require("../cursos/curso.entity");
const disciplina_controller_1 = require("./disciplina.controller");
const disciplina_service_1 = require("./disciplina.service");
const turma_entity_1 = require("../turmas/turma.entity");
const componente_nota_entity_1 = require("./componente-nota.entity");
const componente_nota_service_1 = require("./componente-nota.service");
let DisciplinaModule = class DisciplinaModule {
};
exports.DisciplinaModule = DisciplinaModule;
exports.DisciplinaModule = DisciplinaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([disciplinas_entity_1.DisciplinasEntity, curso_entity_1.CursoEntity, turma_entity_1.TurmaEntity, componente_nota_entity_1.ComponenteNotaEntity])
        ],
        controllers: [disciplina_controller_1.DisciplinaController],
        providers: [disciplina_service_1.DisciplinaService, componente_nota_service_1.ComponenteNotaService],
        exports: [disciplina_service_1.DisciplinaService]
    })
], DisciplinaModule);
//# sourceMappingURL=disciplina.module.js.map