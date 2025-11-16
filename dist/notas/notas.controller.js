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
exports.NotasController = void 0;
const common_1 = require("@nestjs/common");
const notas_service_1 = require("./notas.service");
const lancar_nota_dto_1 = require("./dto/lancar-nota.dto");
let NotasController = class NotasController {
    notasService;
    constructor(notasService) {
        this.notasService = notasService;
    }
    async lancarNota(lancarNotaDTO) {
        const nota = await this.notasService.lancarNota(lancarNotaDTO);
        return {
            nota,
            message: 'Nota lançada com sucesso!',
        };
    }
    async validarNotas(turmaId, disciplinaId) {
        const validacao = await this.notasService.validarNotasCompletas(turmaId, disciplinaId);
        return validacao;
    }
    async exportarNotas(turmaId, disciplinaId, res) {
        try {
            const { filePath, fileName } = await this.notasService.exportarNotasCSV(turmaId, disciplinaId);
            res.download(filePath, fileName, (err) => {
                if (err) {
                    console.error('Erro ao enviar arquivo:', err);
                }
                void this.notasService.deletarArquivoTemporario(fileName);
            });
        }
        catch (error) {
            const errorObj = error;
            const errorMessage = errorObj?.message || '';
            if (errorMessage.includes('Não é possível exportar')) {
                res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: errorMessage,
                });
            }
            else {
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: errorMessage || 'Erro ao exportar notas',
                });
            }
        }
    }
};
exports.NotasController = NotasController;
__decorate([
    (0, common_1.Post)('/lancar'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lancar_nota_dto_1.LancarNotaDTO]),
    __metadata("design:returntype", Promise)
], NotasController.prototype, "lancarNota", null);
__decorate([
    (0, common_1.Get)('validar/:turmaId/disciplina/:disciplinaId'),
    __param(0, (0, common_1.Param)('turmaId')),
    __param(1, (0, common_1.Param)('disciplinaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotasController.prototype, "validarNotas", null);
__decorate([
    (0, common_1.Post)('exportar/:turmaId/disciplina/:disciplinaId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('turmaId')),
    __param(1, (0, common_1.Param)('disciplinaId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], NotasController.prototype, "exportarNotas", null);
exports.NotasController = NotasController = __decorate([
    (0, common_1.Controller)('notas'),
    __metadata("design:paramtypes", [notas_service_1.NotasService])
], NotasController);
//# sourceMappingURL=notas.controller.js.map