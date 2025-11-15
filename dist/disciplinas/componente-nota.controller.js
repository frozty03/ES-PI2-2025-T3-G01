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
exports.ComponenteNotaController = void 0;
const common_1 = require("@nestjs/common");
const componente_nota_service_1 = require("./componente-nota.service");
const atualizar_componente_nota_dto_1 = require("./dto/atualizar-componente-nota.dto");
let ComponenteNotaController = class ComponenteNotaController {
    componenteNotaService;
    constructor(componenteNotaService) {
        this.componenteNotaService = componenteNotaService;
    }
    async atualizarComponenteNota(id, dto) {
        return await this.componenteNotaService.atualizar(id, dto);
    }
    async deletarComponenteNota(id) {
        await this.componenteNotaService.deletar(id);
        return { message: 'Componente de nota excluído.' };
    }
};
exports.ComponenteNotaController = ComponenteNotaController;
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, atualizar_componente_nota_dto_1.AtualizarComponenteNotaDTO]),
    __metadata("design:returntype", Promise)
], ComponenteNotaController.prototype, "atualizarComponenteNota", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComponenteNotaController.prototype, "deletarComponenteNota", null);
exports.ComponenteNotaController = ComponenteNotaController = __decorate([
    (0, common_1.Controller)('componentes-nota'),
    __metadata("design:paramtypes", [componente_nota_service_1.ComponenteNotaService])
], ComponenteNotaController);
//# sourceMappingURL=componente-nota.controller.js.map