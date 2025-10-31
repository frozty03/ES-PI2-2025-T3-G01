"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const nodemailer = __importStar(require("nodemailer"));
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    usuarioRepository;
    jwtService;
    configService;
    transporter;
    constructor(usuarioRepository, jwtService, configService) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'notadezpi@gmail.com',
                pass: 'vnzouynvuabhgodf',
            },
        });
    }
    async createUser(usuarioEntity) {
        const emailExiste = await this.usuarioRepository.findOne({
            where: { email: usuarioEntity.email }
        });
        if (emailExiste) {
            throw new common_1.ConflictException('Esse email ja esta cadastrado...');
        }
        await this.usuarioRepository.save(usuarioEntity);
    }
    async login(loginUserDTO) {
        const usuario = await this.usuarioRepository.findOne({
            where: { email: loginUserDTO.email }
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('Email ou senha invalidos');
        }
        const senhasCombinam = await bcrypt.compare(loginUserDTO.senha, usuario.senha);
        if (!senhasCombinam) {
            throw new common_1.UnauthorizedException('Email ou senha invalidos');
        }
        const payload = {
            sub: usuario.id,
            nome: usuario.nome
        };
        const tokenAcesso = await this.jwtService.signAsync(payload);
        return {
            acess_token: tokenAcesso,
            message: 'Login realizado com sucesso'
        };
    }
    async esqueciSenha(esqueciSenhaDto) {
        const { email } = esqueciSenhaDto;
        const usuario = await this.usuarioRepository.findOne({ where: { email } });
        if (!usuario) {
            console.log(`Tentativa de reset de senha para email não existente: ${email}`);
            return {
                message: 'Um link de recuperação foi enviado.',
            };
        }
        const payload = { sub: usuario.id, email: usuario.email };
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '20m',
        });
        const appUrl = this.configService.get('APP_URL');
        const resetLink = `${appUrl}/html/linkemail.html?token=${token}`;
        const mailOptions = {
            from: `"NotaDez" <notadezpi@gmail.com>`,
            to: usuario.email,
            subject: 'Recuperação de Senha - NotaDez',
            html: `
        <p>Olá, ${usuario.nome},</p>
        <p>Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para criar uma nova senha:</p>
        <a href="${resetLink}">Redefinir Senha</a>
        <p>Este link expira em 20 minutos.</p>
        <p>Se você não solicitou isso, por favor ignore este email.</p>
        `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            return {
                message: 'Um link de recuperação foi enviado.',
            };
        }
        catch (error) {
            console.error('Erro ao enviar email:', error);
            throw new common_1.InternalServerErrorException('Não foi possível enviar o email de recuperação.');
        }
    }
    async resetarSenha(resetarSenhaDto) {
        const { token, novaSenha, confirmaSenha } = resetarSenhaDto;
        if (novaSenha !== confirmaSenha) {
            throw new common_1.ConflictException('As senhas não coincidem.');
        }
        let payload;
        try {
            const secret = this.configService.get('JWT_SECRET');
            payload = await this.jwtService.verifyAsync(token, {
                secret: secret,
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token inválido ou expirado.');
        }
        const usuario = await this.usuarioRepository.findOne({
            where: { id: payload.sub },
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuário não encontrado.');
        }
        const salt = await bcrypt.genSalt();
        const hashedSenha = await bcrypt.hash(novaSenha, salt);
        await this.usuarioRepository.update(usuario.id, {
            senha: hashedSenha,
        });
        return { message: 'Senha atualizada com sucesso!' };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map