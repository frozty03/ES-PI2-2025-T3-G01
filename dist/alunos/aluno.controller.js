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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoController = void 0;
const common_1 = require("@nestjs/common");
const criar_aluno_dto_1 = require("./dto/criar-aluno.dto");
const atualizar_aluno_dto_1 = require("./dto/atualizar-aluno.dto");
const aluno_service_1 = require("./aluno.service");
const deletar_lote_aluno_dto_1 = require("./dto/deletar-lote-aluno.dto");
let AlunoController = class AlunoController {
    alunoService;
    constructor(alunoService) {
        this.alunoService = alunoService;
    }
    async criar(userId, criarAlunoDto) {
        const aluno = await this.alunoService.cadastrarAluno(criarAlunoDto, userId);
        return {
            aluno,
            message: 'Aluno cadastrado com sucesso!'
        };
    }
    async listarPorTurma(turmaId, userId) {
        return await this.alunoService.listarPorTurma(turmaId, userId);
    }
    async deletarLote(userId, deletarLoteAlunoDto) {
        return await this.alunoService.deletarLote(userId, deletarLoteAlunoDto);
    }
    async deletarAluno(id, userId) {
        return await this.alunoService.deletarAluno(id, userId);
    }
    async atualizarAluno(atualizarAlunoDTO, id, userId) {
        const aluno = await this.alunoService.atualizarAluno(atualizarAlunoDTO, id, userId);
        return {
            aluno,
            message: 'Aluno atualizado com sucesso!'
        };
    }
};
exports.AlunoController = AlunoController;
__decorate([
    (0, common_1.Post)('/user/:userId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, criar_aluno_dto_1.CriarAlunoDTO]),
    __metadata("design:returntype", Promise)
], AlunoController.prototype, "criar", null);
__decorate([
    (0, common_1.Get)('/turma/:turmaId/user/:userId'),
    __param(0, (0, common_1.Param)('turmaId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AlunoController.prototype, "listarPorTurma", null);
__decorate([
    (0, common_1.Delete)('/lote/user/:userId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, deletar_lote_aluno_dto_1.DeletarLoteAlunoDTO]),
    __metadata("design:returntype", Promise)
], AlunoController.prototype, "deletarLote", null);
__decorate([
    (0, common_1.Delete)('/:id/user/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AlunoController.prototype, "deletarAluno", null);
__decorate([
    (0, common_1.Put)('/:id/user/:userId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [atualizar_aluno_dto_1.AtualizarAlunoDTO, String, String]),
    __metadata("design:returntype", Promise)
], AlunoController.prototype, "atualizarAluno", null);
exports.AlunoController = AlunoController = __decorate([
    (0, common_1.Controller)('/alunos'),
    __metadata("design:paramtypes", [aluno_service_1.AlunoService])
], AlunoController);
//# sourceMappingURL=aluno.controller.js.map