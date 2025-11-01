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
exports.InstituicaoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const instituicao_entity_1 = require("./instituicao.entity");
const user_entity_1 = require("../users/user.entity");
let InstituicaoService = class InstituicaoService {
    instituicaoRepository;
    userRepository;
    constructor(instituicaoRepository, userRepository) {
        this.instituicaoRepository = instituicaoRepository;
        this.userRepository = userRepository;
    }
    async createInstituicao(createInstituicaoDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        const instituicao = this.instituicaoRepository.create({
            nome: createInstituicaoDto.nome,
            users: [user],
        });
        await this.instituicaoRepository.save(instituicao);
        return instituicao;
    }
    async findByUserId(userId) {
        const instituicoes = await this.instituicaoRepository
            .createQueryBuilder('i')
            .innerJoin('i.users', 'u', 'u.id = :userId', { userId })
            .select(['i.id', 'i.nome'])
            .getMany();
        if (!instituicoes || instituicoes.length === 0) {
            throw new common_1.UnauthorizedException('Nenhuma instituição encontrada para este usuário');
        }
        return {
            userId,
            instituicoes: instituicoes.map((inst) => ({
                id: inst.id,
                nome: inst.nome,
            })),
        };
    }
    async deleteInstituicao(instituicaoId, userId) {
        const instituicao = await this.instituicaoRepository.findOne({
            where: { id: instituicaoId },
            relations: ['users'],
        });
        if (!instituicao)
            throw new common_1.NotFoundException('Instituição não encontrada');
        const isAssociated = (instituicao.users || []).some((u) => u.id === userId);
        if (!isAssociated) {
            throw new common_1.UnauthorizedException('Usuário não autorizado a deletar esta instituição');
        }
        await this.instituicaoRepository.delete(instituicaoId);
        return { success: true };
    }
};
exports.InstituicaoService = InstituicaoService;
exports.InstituicaoService = InstituicaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(instituicao_entity_1.InstituicaoEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], InstituicaoService);
//# sourceMappingURL=instituicao.service.js.map