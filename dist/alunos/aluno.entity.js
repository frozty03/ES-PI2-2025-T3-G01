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
exports.AlunoEntity = void 0;
const turma_entity_1 = require("../turmas/turma.entity");
const typeorm_1 = require("typeorm");
let AlunoEntity = class AlunoEntity {
    id;
    ra;
    nome;
    turmas;
};
exports.AlunoEntity = AlunoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AlunoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ra', length: 8, unique: true, nullable: false }),
    __metadata("design:type", String)
], AlunoEntity.prototype, "ra", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome', length: 150, nullable: false }),
    __metadata("design:type", String)
], AlunoEntity.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => turma_entity_1.TurmaEntity, (turma) => turma.alunos),
    (0, typeorm_1.JoinTable)({
        name: 'Participa_Aluno_Turma',
        joinColumn: { name: 'id_aluno', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'id_turma', referencedColumnName: 'id' }
    }),
    __metadata("design:type", Array)
], AlunoEntity.prototype, "turmas", void 0);
exports.AlunoEntity = AlunoEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Alunos' })
], AlunoEntity);
//# sourceMappingURL=aluno.entity.js.map