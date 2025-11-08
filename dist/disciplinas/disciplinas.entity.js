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
exports.DisciplinasEntity = void 0;
const curso_entity_1 = require("../cursos/curso.entity");
const typeorm_1 = require("typeorm");
let DisciplinasEntity = class DisciplinasEntity {
    id;
    cod;
    nome;
    sigla;
    periodo;
    cursos;
};
exports.DisciplinasEntity = DisciplinasEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DisciplinasEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod', type: 'integer', nullable: false, unique: true }),
    __metadata("design:type", Number)
], DisciplinasEntity.prototype, "cod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome', length: 150, nullable: false }),
    __metadata("design:type", String)
], DisciplinasEntity.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sigla', length: 10, nullable: false }),
    __metadata("design:type", String)
], DisciplinasEntity.prototype, "sigla", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'periodo', length: 150, nullable: false }),
    __metadata("design:type", String)
], DisciplinasEntity.prototype, "periodo", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => curso_entity_1.CursoEntity, (curso) => curso.disciplinas),
    (0, typeorm_1.JoinTable)({
        name: 'Compoe_Disciplina_Curso',
        joinColumn: { name: 'id_disciplina', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'id_curso', referencedColumnName: 'id' }
    }),
    __metadata("design:type", Array)
], DisciplinasEntity.prototype, "cursos", void 0);
exports.DisciplinasEntity = DisciplinasEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Disciplinas ' })
], DisciplinasEntity);
//# sourceMappingURL=disciplinas.entity.js.map