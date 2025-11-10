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
exports.CriarAlunoDTO = void 0;
const class_validator_1 = require("class-validator");
class CriarAlunoDTO {
    ra;
    nome;
    turmaIds;
}
exports.CriarAlunoDTO = CriarAlunoDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Conteudo nao pode ser vazio' }),
    (0, class_validator_1.IsString)({ message: 'RA deve ser uma string' }),
    (0, class_validator_1.MinLength)(8, { message: 'RA deve 8 caracteres' }),
    (0, class_validator_1.MaxLength)(8, { message: 'RA deve 8 caracteres' }),
    __metadata("design:type", String)
], CriarAlunoDTO.prototype, "ra", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome deve ser preenchido!' }),
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string' }),
    (0, class_validator_1.Length)(1, 150, { message: 'Nome deve ter entre 1 a 150 caracteres' }),
    __metadata("design:type", String)
], CriarAlunoDTO.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Turmas deve ser um array' }),
    (0, class_validator_1.IsUUID)('4', { each: true, message: 'Cada turma deve ter um ID UUID válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Pelo menos uma turma deve ser informado' }),
    __metadata("design:type", Array)
], CriarAlunoDTO.prototype, "turmaIds", void 0);
//# sourceMappingURL=criar-aluno.dto.js.map