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
exports.TurmaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const turma_entity_1 = require("./turma.entity");
const disciplinas_entity_1 = require("../disciplinas/disciplinas.entity");
let TurmaService = class TurmaService {
    turmaRepository;
    disciplinaRepository;
    constructor(turmaRepository, disciplinaRepository) {
        this.turmaRepository = turmaRepository;
        this.disciplinaRepository = disciplinaRepository;
    }
    async createTurma(turmaCreateDto, userId) {
        const codigoExiste = await this.turmaRepository.findOne({
            where: { cod: turmaCreateDto.cod },
        });
        if (codigoExiste) {
            throw new common_1.ConflictException('Turma já cadastrada');
        }
        const disciplina = await this.disciplinaRepository
            .createQueryBuilder('disciplina')
            .innerJoin('disciplina.cursos', 'curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
            .where('disciplina.id IN (:...ids)', { ids: turmaCreateDto.disciplinasIds })
            .andWhere('user.id = :userId', { userId })
            .getMany();
        if (disciplina.length !== turmaCreateDto.disciplinasIds.length) {
            throw new common_1.NotFoundException('Uma ou mais disciplinas informados nao foram encontradsos');
        }
        const turma = this.turmaRepository.create({
            cod: turmaCreateDto.cod,
            disciplinas: disciplina
        });
        return await this.turmaRepository.save(turma);
    }
    async listarPorDisciplina(disciplinaId, userId) {
        const disciplina = await this.disciplinaRepository
            .createQueryBuilder('disciplina')
            .innerJoin('disciplina.cursos', 'curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
            .where('disciplina.id = :disciplinaId', { disciplinaId })
            .andWhere('user.id = :userId', { userId })
            .getOne();
        if (!disciplina) {
            throw new common_1.NotFoundException('Curso não encontrado');
        }
        return await this.turmaRepository
            .createQueryBuilder('turma')
            .innerJoin('turma.disciplinas', 'disciplina')
            .leftJoinAndSelect('turma.disciplinas', 'disciplinas')
            .where('disciplina.id = :disciplinaId', { disciplinaId })
            .getMany();
    }
    async buscarTurmaPeloId(id, userId) {
        const turma = await this.turmaRepository
            .createQueryBuilder('turma')
            .innerJoin('turmas.disciplinas', 'disciplina')
            .innerJoin('disciplina.cursos', 'curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
            .leftJoinAndSelect('turma.disciplinas', 'disciplinas')
            .where('turma.id = :id', { id })
            .andWhere('user.id = :userId', { userId })
            .getOne();
        if (!turma) {
            throw new common_1.NotFoundException('Turma não encontrada');
        }
        return turma;
    }
    async deletarTurma(id, userId) {
        const turma = await this.buscarTurmaPeloId(id, userId);
        await this.turmaRepository.remove(turma);
        return { message: 'Turma excluída com sucesso!' };
    }
};
exports.TurmaService = TurmaService;
exports.TurmaService = TurmaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(turma_entity_1.TurmaEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(disciplinas_entity_1.DisciplinasEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TurmaService);
//# sourceMappingURL=turma.service.js.map