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
exports.CriarComponenteDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CriarComponenteDTO {
    nome;
    peso;
}
exports.CriarComponenteDTO = CriarComponenteDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome deve ser preenchido!' }),
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string' }),
    (0, class_validator_1.Length)(1, 150, { message: 'Nome deve ter entre 1 a 150 caracteres' }),
    __metadata("design:type", String)
], CriarComponenteDTO.prototype, "nome", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)({ message: 'Peso deve ser preenchido' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Peso deve ser um número' }),
    __metadata("design:type", Number)
], CriarComponenteDTO.prototype, "peso", void 0);
//# sourceMappingURL=criar-componente-nota.dto.js.map