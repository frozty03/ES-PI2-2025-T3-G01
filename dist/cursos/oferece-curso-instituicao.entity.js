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
exports.OfereceCursoInstituicaoEntity = void 0;
const typeorm_1 = require("typeorm");
const curso_entity_1 = require("./curso.entity");
const instituicao_entity_1 = require("../instituicoes/instituicao.entity");
let OfereceCursoInstituicaoEntity = class OfereceCursoInstituicaoEntity {
    idInstituicao;
    idCurso;
    instituicao;
    curso;
};
exports.OfereceCursoInstituicaoEntity = OfereceCursoInstituicaoEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', { name: 'id_instituicao' }),
    __metadata("design:type", String)
], OfereceCursoInstituicaoEntity.prototype, "idInstituicao", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', { name: 'id_curso' }),
    __metadata("design:type", String)
], OfereceCursoInstituicaoEntity.prototype, "idCurso", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => instituicao_entity_1.InstituicaoEntity, (instituicao) => instituicao.id, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_instituicao' }),
    __metadata("design:type", instituicao_entity_1.InstituicaoEntity)
], OfereceCursoInstituicaoEntity.prototype, "instituicao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => curso_entity_1.CursoEntity, (curso) => curso.id, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_curso' }),
    __metadata("design:type", curso_entity_1.CursoEntity)
], OfereceCursoInstituicaoEntity.prototype, "curso", void 0);
exports.OfereceCursoInstituicaoEntity = OfereceCursoInstituicaoEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Oferece_Curso_Instituicao' })
], OfereceCursoInstituicaoEntity);
//# sourceMappingURL=oferece-curso-instituicao.entity.js.map