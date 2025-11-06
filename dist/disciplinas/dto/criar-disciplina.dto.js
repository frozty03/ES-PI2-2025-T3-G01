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
exports.CriarDisciplinaDTO = void 0;
const class_validator_1 = require("class-validator");
class CriarDisciplinaDTO {
    cod;
    nome;
    sigla;
    periodo;
    cursosIds;
}
exports.CriarDisciplinaDTO = CriarDisciplinaDTO;
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Código deve ser um número' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Código é obrigatório' }),
    __metadata("design:type", Number)
], CriarDisciplinaDTO.prototype, "cod", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório' }),
    (0, class_validator_1.Length)(1, 150, { message: 'Nome deve ter entre 1 e 150 caracteres' }),
    __metadata("design:type", String)
], CriarDisciplinaDTO.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Sigla deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Sigla é obrigatória' }),
    (0, class_validator_1.Length)(1, 10, { message: 'Sigla deve ter entre 1 e 10 caracteres' }),
    __metadata("design:type", String)
], CriarDisciplinaDTO.prototype, "sigla", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Período deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Período é obrigatório' }),
    (0, class_validator_1.Length)(1, 2, { message: 'Período deve ter 1 ou 2 caracteres' }),
    __metadata("design:type", String)
], CriarDisciplinaDTO.prototype, "periodo", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Cursos deve ser um array' }),
    (0, class_validator_1.IsUUID)('4', { each: true, message: 'Cada curso deve ter um ID UUID válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Pelo menos um curso deve ser informado' }),
    __metadata("design:type", Array)
], CriarDisciplinaDTO.prototype, "cursosIds", void 0);
//# sourceMappingURL=criar-disciplina.dto.js.map