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
exports.AlunoNotaEntity = void 0;
const typeorm_1 = require("typeorm");
const aluno_entity_1 = require("../alunos/aluno.entity");
const componente_nota_entity_1 = require("../disciplinas/componente-nota.entity");
const turma_entity_1 = require("../turmas/turma.entity");
let AlunoNotaEntity = class AlunoNotaEntity {
    id;
    valor;
    aluno;
    componenteNota;
    turma;
};
exports.AlunoNotaEntity = AlunoNotaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AlunoNotaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 4, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], AlunoNotaEntity.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => aluno_entity_1.AlunoEntity, { onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_aluno' }),
    __metadata("design:type", aluno_entity_1.AlunoEntity)
], AlunoNotaEntity.prototype, "aluno", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => componente_nota_entity_1.ComponenteNotaEntity, { onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_componente_nota' }),
    __metadata("design:type", componente_nota_entity_1.ComponenteNotaEntity)
], AlunoNotaEntity.prototype, "componenteNota", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => turma_entity_1.TurmaEntity, { onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_turma' }),
    __metadata("design:type", turma_entity_1.TurmaEntity)
], AlunoNotaEntity.prototype, "turma", void 0);
exports.AlunoNotaEntity = AlunoNotaEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Aluno_Nota' }),
    (0, typeorm_1.Unique)(['aluno', 'componenteNota', 'turma'])
], AlunoNotaEntity);
//# sourceMappingURL=aluno-nota.entity.js.map