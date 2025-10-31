"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituicaoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const instituicao_entity_1 = require("./instituicao.entity");
const instituicao_service_1 = require("./instituicao.service");
const instituicao_controller_1 = require("./instituicao.controller");
let InstituicaoModule = class InstituicaoModule {
};
exports.InstituicaoModule = InstituicaoModule;
exports.InstituicaoModule = InstituicaoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([instituicao_entity_1.InstituicaoEntity])],
        providers: [instituicao_service_1.InstituicaoService],
        controllers: [instituicao_controller_1.InstituicaoController],
        exports: [instituicao_service_1.InstituicaoService],
    })
], InstituicaoModule);
//# sourceMappingURL=instituicao.module.js.map