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
exports.CursoController = void 0;
const common_1 = require("@nestjs/common");
const curso_service_1 = require("./curso.service");
const criar_curso_dto_1 = require("./criar-curso.dto");
let CursoController = class CursoController {
    cursoService;
    constructor(cursoService) {
        this.cursoService = cursoService;
    }
    async criarCurso(userId, dto) {
        return this.cursoService.criarCurso(dto, userId);
    }
    async listarCursosPorInstituicao(idInstituicao, userId) {
        return this.cursoService.listarCursosPorInstituicao(idInstituicao, userId);
    }
    async deletarCurso(id, userId) {
        return this.cursoService.deletarCurso(id, userId);
    }
};
exports.CursoController = CursoController;
__decorate([
    (0, common_1.Post)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, criar_curso_dto_1.CriarCursoDto]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "criarCurso", null);
__decorate([
    (0, common_1.Get)('instituicao/:idInstituicao/user/:userId'),
    __param(0, (0, common_1.Param)('idInstituicao')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "listarCursosPorInstituicao", null);
__decorate([
    (0, common_1.Delete)(':id/user/userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "deletarCurso", null);
exports.CursoController = CursoController = __decorate([
    (0, common_1.Controller)('cursos'),
    __metadata("design:paramtypes", [curso_service_1.CursoService])
], CursoController);
//# sourceMappingURL=curso.controller.js.map