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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const criarUser_dto_1 = require("./criarUser.dto");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const listaUsuario_dto_1 = require("./listaUsuario.dto");
const path_1 = require("path");
const loginUser_dto_1 = require("./loginUser.dto");
let UserController = class UserController {
    usuarioService;
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    serveCadastroPage(res) {
        res.sendFile((0, path_1.join)(process.cwd(), 'public', 'html', 'cadastro.html'));
    }
    async criarUser(dadosDoUsuario) {
        const usuarioEntity = new user_entity_1.UserEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.telefone_celular = dadosDoUsuario.telefone_celular;
        usuarioEntity.id = (0, uuid_1.v4)();
        await this.usuarioService.createUser(usuarioEntity);
        return {
            usuario: new listaUsuario_dto_1.ListarUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            message: 'Usuario criado com sucesso!'
        };
    }
    serveLoginPage(res) {
        res.sendFile((0, path_1.join)(process.cwd(), 'public', 'html', 'login.html'));
    }
    async login(loginUserDTO) {
        return this.usuarioService.login(loginUserDTO);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/cadastro'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "serveCadastroPage", null);
__decorate([
    (0, common_1.Post)('/cadastro'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [criarUser_dto_1.CriarUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "criarUser", null);
__decorate([
    (0, common_1.Get)('/login'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "serveLoginPage", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginUser_dto_1.LoginUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('/usuarios'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map