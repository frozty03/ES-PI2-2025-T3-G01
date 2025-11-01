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
exports.CursoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const curso_entity_1 = require("./curso.entity");
const instituicao_entity_1 = require("../instituicoes/instituicao.entity");
let CursoService = class CursoService {
    cursoRepository;
    instituicaoRepository;
    constructor(cursoRepository, instituicaoRepository) {
        this.cursoRepository = cursoRepository;
        this.instituicaoRepository = instituicaoRepository;
    }
    async criarCurso(dto) {
        const instituicao = await this.instituicaoRepository.findOne({
            where: { id: dto.idInstituicao },
            relations: ['cursos'],
        });
        if (!instituicao) {
            throw new common_1.NotFoundException('Instituição não encontrada');
        }
        const curso = this.cursoRepository.create({ nome: dto.nome });
        await this.cursoRepository.save(curso);
        instituicao.cursos = [...(instituicao.cursos || []), curso];
        await this.instituicaoRepository.save(instituicao);
        return { id: curso.id, nome: curso.nome };
    }
    async listarCursosPorInstituicao(idInstituicao) {
        const instituicao = await this.instituicaoRepository.findOne({
            where: { id: idInstituicao },
            relations: ['cursos'],
        });
        if (!instituicao) {
            throw new common_1.NotFoundException('Instituição não encontrada');
        }
        return (instituicao.cursos || []).map((curso) => ({
            id: curso.id,
            nome: curso.nome,
        }));
    }
    async deletarCurso(id) {
        const curso = await this.cursoRepository.findOne({ where: { id } });
        if (!curso) {
            throw new common_1.NotFoundException('Curso não encontrado');
        }
        await this.cursoRepository.remove(curso);
    }
};
exports.CursoService = CursoService;
exports.CursoService = CursoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(curso_entity_1.CursoEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(instituicao_entity_1.InstituicaoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CursoService);
//# sourceMappingURL=curso.service.js.map