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
exports.ImportarAlunosDTO = void 0;
const class_validator_1 = require("class-validator");
class ImportarAlunosDTO {
    turmaId;
    alunos;
}
exports.ImportarAlunosDTO = ImportarAlunosDTO;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'ID da turma deve ser um UUID válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID da turma é obrigatório' }),
    __metadata("design:type", String)
], ImportarAlunosDTO.prototype, "turmaId", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Alunos deve ser um array' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Lista de alunos não pode ser vazia' }),
    __metadata("design:type", Array)
], ImportarAlunosDTO.prototype, "alunos", void 0);
//# sourceMappingURL=importar-alunos.dto.js.map