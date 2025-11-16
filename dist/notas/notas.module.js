"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const aluno_nota_entity_1 = require("./aluno-nota.entity");
const notas_service_1 = require("./notas.service");
const notas_controller_1 = require("./notas.controller");
const aluno_entity_1 = require("../alunos/aluno.entity");
const componente_nota_entity_1 = require("../disciplinas/componente-nota.entity");
const turma_entity_1 = require("../turmas/turma.entity");
const disciplinas_entity_1 = require("../disciplinas/disciplinas.entity");
let NotasModule = class NotasModule {
};
exports.NotasModule = NotasModule;
exports.NotasModule = NotasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                aluno_nota_entity_1.AlunoNotaEntity,
                aluno_entity_1.AlunoEntity,
                componente_nota_entity_1.ComponenteNotaEntity,
                turma_entity_1.TurmaEntity,
                disciplinas_entity_1.DisciplinasEntity,
            ]),
        ],
        providers: [notas_service_1.NotasService],
        controllers: [notas_controller_1.NotasController],
        exports: [notas_service_1.NotasService],
    })
], NotasModule);
//# sourceMappingURL=notas.module.js.map