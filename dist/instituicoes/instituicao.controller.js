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
exports.InstituicaoController = void 0;
const common_1 = require("@nestjs/common");
const instituicao_service_1 = require("./instituicao.service");
const criarInstituicao_dto_1 = require("./criarInstituicao.dto");
let InstituicaoController = class InstituicaoController {
    instituicaoService;
    constructor(instituicaoService) {
        this.instituicaoService = instituicaoService;
    }
    async create(createInstituicaoDto) {
        return this.instituicaoService.createInstituicao(createInstituicaoDto);
    }
    async findByUser(userId) {
        return this.instituicaoService.findByUserId(userId);
    }
};
exports.InstituicaoController = InstituicaoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [criarInstituicao_dto_1.CreateInstituicaoDto]),
    __metadata("design:returntype", Promise)
], InstituicaoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstituicaoController.prototype, "findByUser", null);
exports.InstituicaoController = InstituicaoController = __decorate([
    (0, common_1.Controller)('instituicoes'),
    __metadata("design:paramtypes", [instituicao_service_1.InstituicaoService])
], InstituicaoController);
//# sourceMappingURL=instituicao.controller.js.map