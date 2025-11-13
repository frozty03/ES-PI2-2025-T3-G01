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
exports.ComponenteNotaEntity = void 0;
const typeorm_1 = require("typeorm");
let ComponenteNotaEntity = class ComponenteNotaEntity {
    id;
    nome;
    peso;
};
exports.ComponenteNotaEntity = ComponenteNotaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ComponenteNotaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome', length: 150, nullable: false }),
    __metadata("design:type", String)
], ComponenteNotaEntity.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'peso', type: "numeric", precision: 4, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], ComponenteNotaEntity.prototype, "peso", void 0);
exports.ComponenteNotaEntity = ComponenteNotaEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Componente_Nota' })
], ComponenteNotaEntity);
//# sourceMappingURL=componente-nota.entity.js.map