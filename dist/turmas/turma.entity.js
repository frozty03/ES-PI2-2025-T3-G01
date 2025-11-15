"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmaEntity = void 0;
const typeorm_1 = require("typeorm");
const disciplinas_entity_1 = require("../disciplinas/disciplinas.entity");
const aluno_entity_1 = require("../alunos/aluno.entity");
let TurmaEntity = class TurmaEntity {
    id;
    cod;
    disciplinas;
    alunos;
};
exports.TurmaEntity = TurmaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TurmaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod', type: "integer", unique: true, nullable: false }),
    __metadata("design:type", Number)
], TurmaEntity.prototype, "cod", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => disciplinas_entity_1.DisciplinasEntity, (disciplina) => disciplina.turmas),
    (0, typeorm_1.JoinTable)({
        name: 'Cria_Turmas_Disciplina',
        joinColumn: { name: 'id_turma', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'id_disciplina', referencedColumnName: 'id' }
    }),
    __metadata("design:type", Array)
], TurmaEntity.prototype, "disciplinas", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => aluno_entity_1.AlunoEntity, (aluno) => aluno.turmas),
    __metadata("design:type", Array)
], TurmaEntity.prototype, "alunos", void 0);
exports.TurmaEntity = TurmaEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Turmas' })
], TurmaEntity);
//# sourceMappingURL=turma.entity.js.map