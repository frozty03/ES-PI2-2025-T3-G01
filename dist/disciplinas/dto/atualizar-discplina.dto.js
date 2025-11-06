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
exports.AtualizarDisciplinaDTO = void 0;
const class_validator_1 = require("class-validator");
class AtualizarDisciplinaDTO {
    codigo;
    nome;
    sigla;
    periodo;
    cursosIds;
}
exports.AtualizarDisciplinaDTO = AtualizarDisciplinaDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Código deve ser um número' }),
    __metadata("design:type", Number)
], AtualizarDisciplinaDTO.prototype, "codigo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 150, { message: 'O nome deve ter entre 1 e 150 caracteres' }),
    __metadata("design:type", String)
], AtualizarDisciplinaDTO.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 10, { message: 'A sigla deve ter entre 1 e 10 caracteres' }),
    __metadata("design:type", String)
], AtualizarDisciplinaDTO.prototype, "sigla", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 2, { message: 'O periodo deve ter entre 1 e 2 caracteres' }),
    __metadata("design:type", String)
], AtualizarDisciplinaDTO.prototype, "periodo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true, message: 'Cada curso deve ter um ID UUID válido' }),
    __metadata("design:type", Array)
], AtualizarDisciplinaDTO.prototype, "cursosIds", void 0);
//# sourceMappingURL=atualizar-discplina.dto.js.map