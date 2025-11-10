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
exports.AlunoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const aluno_entity_1 = require("./aluno.entity");
const typeorm_2 = require("typeorm");
const turma_entity_1 = require("../turmas/turma.entity");
let AlunoService = class AlunoService {
    alunoRepository;
    turmaRepository;
    constructor(alunoRepository, turmaRepository) {
        this.alunoRepository = alunoRepository;
        this.turmaRepository = turmaRepository;
    }
    async cadastrarAluno(criarAlunoDTO, userId) {
        const raExiste = await this.alunoRepository.findOne({
            where: { ra: criarAlunoDTO.ra }
        });
        if (raExiste) {
            throw new common_1.ConflictException('Ja existe aluno cadastrado com esse RA!');
        }
        const turmas = await this.turmaRepository
            .createQueryBuilder('turma')
            .innerJoin('turma.disciplinas', 'disciplina')
            .innerJoin('disciplina.cursos', 'curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
            .where('turma.id IN (:...ids)', { ids: criarAlunoDTO.turmaIds })
            .andWhere('user.id = :userId', { userId })
            .getMany();
        if (turmas.length !== criarAlunoDTO.turmaIds.length) {
            throw new common_1.NotFoundException('Uma ou mais turmas informadas nao foram encontradas');
        }
        const aluno = await this.alunoRepository.create({
            ra: criarAlunoDTO.ra,
            nome: criarAlunoDTO.nome,
            turmas: turmas
        });
        return await this.alunoRepository.save(aluno);
    }
    async listarPorTurma(turmaId, userId) {
        const turma = await this.turmaRepository
            .createQueryBuilder('turma')
            .innerJoin('turma.disciplinas', 'disciplina')
            .innerJoin('disciplina.cursos', 'curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
            .where('turma.id = :turmaId', { turmaId })
            .andWhere('user.id = :userId', { userId })
            .getOne();
        if (!turma) {
            throw new common_1.NotFoundException('Turma nao encontrada');
        }
        return await this.alunoRepository
            .createQueryBuilder('aluno')
            .innerJoin('aluno.turmas', 'turma')
            .leftJoinAndSelect('aluno.turmas', 'turmas')
            .where('turma.id = :turmaId', { turmaId })
            .getMany();
    }
    async buscarAlunoId(id, userId) {
        const aluno = await this.alunoRepository
            .createQueryBuilder('aluno')
            .innerJoin('aluno.turmas', 'turma')
            .innerJoin('turma.disciplinas', 'disciplina')
            .innerJoin('disciplina.cursos', 'curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
            .leftJoinAndSelect('aluno.turmas', 'turmas')
            .where('aluno.id = :id', { id })
            .andWhere('user.id = :userId', { userId })
            .getOne();
        if (!aluno) {
            throw new common_1.NotFoundException('Aluno não encontrado');
        }
        return aluno;
    }
    async deletarAluno(id, userId) {
        const aluno = await this.buscarAlunoId(id, userId);
        await this.alunoRepository.remove(aluno);
        return { message: 'Aluno excluido com sucesso!' };
    }
    async atualizarAluno(atualizarAlunoDTO, id, userId) {
        const aluno = await this.buscarAlunoId(id, userId);
        if (atualizarAlunoDTO.ra && atualizarAlunoDTO.ra !== aluno.ra) {
            const raExiste = await this.alunoRepository.findOne({
                where: { ra: atualizarAlunoDTO.ra }
            });
            if (raExiste) {
                throw new common_1.ConflictException('Ja existe aluno cadastrado com esse RA!');
            }
        }
        if (atualizarAlunoDTO.turmaIds) {
            const turmas = await this.turmaRepository
                .createQueryBuilder('turma')
                .innerJoin('turma.disciplinas', 'disciplina')
                .innerJoin('disciplina.cursos', 'curso')
                .innerJoin('curso.instituicoes', 'instituicao')
                .innerJoin('instituicao.users', 'user')
                .where('turma.id IN (:...ids)', { ids: atualizarAlunoDTO.turmaIds })
                .andWhere('user.id = :userId', { userId })
                .getMany();
            if (turmas.length != atualizarAlunoDTO.turmaIds.length) {
                throw new common_1.NotFoundException('Uma ou mais turmas informadas nao foram encontradas');
            }
            aluno.turmas = turmas;
        }
        Object.assign(aluno, {
            ra: atualizarAlunoDTO.ra ?? aluno.ra,
            nome: atualizarAlunoDTO.nome ?? aluno.nome
        });
        return await this.alunoRepository.save(aluno);
    }
    async deletarLote(userId, deletarLoteAlunoDTO) {
        const alunos = await this.alunoRepository
            .createQueryBuilder('aluno')
            .innerJoin('aluno.turmas', 'turma')
            .innerJoin('turma.disciplinas', 'disciplina')
            .innerJoin('disciplina.cursos', 'curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
            .where('aluno.id IN (:...ids)', { ids: deletarLoteAlunoDTO.alunosIds })
            .andWhere('user.id = :userId', { userId })
            .getMany();
        if (alunos.length !== deletarLoteAlunoDTO.alunosIds.length) {
            throw new common_1.UnauthorizedException('Um ou mais alunos não pertencem a você');
        }
        await this.alunoRepository.remove(alunos);
        return {
            message: `${alunos.length} aluno(s) deletado(s) com sucesso`
        };
    }
};
exports.AlunoService = AlunoService;
exports.AlunoService = AlunoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(aluno_entity_1.AlunoEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(turma_entity_1.TurmaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AlunoService);
//# sourceMappingURL=aluno.service.js.map