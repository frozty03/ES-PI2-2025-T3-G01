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
exports.TurmasController = void 0;
const common_1 = require("@nestjs/common");
const turma_service_1 = require("./turma.service");
const criarTurma_dto_1 = require("./dto/criarTurma.dto");
let TurmasController = class TurmasController {
    turmaService;
    constructor(turmaService) {
        this.turmaService = turmaService;
    }
    async criar(userId, createTurmaDTO) {
        const turma = await this.turmaService.createTurma(createTurmaDTO, userId);
        return {
            turma,
            message: 'Turma criada com sucesso!'
        };
    }
    async listarPorDisciplina(disciplinaId, userId) {
        return await this.turmaService.listarPorDisciplina(disciplinaId, userId);
    }
    async deletar(id, userId) {
        return await this.turmaService.deletarTurma(id, userId);
    }
};
exports.TurmasController = TurmasController;
__decorate([
    (0, common_1.Post)('/user/:userId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, criarTurma_dto_1.CreateTurmaDto]),
    __metadata("design:returntype", Promise)
], TurmasController.prototype, "criar", null);
__decorate([
    (0, common_1.Get)('disciplina/:disciplinaId/user/:userId'),
    __param(0, (0, common_1.Param)('disciplinaId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TurmasController.prototype, "listarPorDisciplina", null);
__decorate([
    (0, common_1.Delete)(':id/user/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TurmasController.prototype, "deletar", null);
exports.TurmasController = TurmasController = __decorate([
    (0, common_1.Controller)('turmas'),
    __metadata("design:paramtypes", [turma_service_1.TurmaService])
], TurmasController);
;
//# sourceMappingURL=turma.controller.js.map