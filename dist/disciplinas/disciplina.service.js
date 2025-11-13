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
exports.DisciplinaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const disciplinas_entity_1 = require("./disciplinas.entity");
const typeorm_2 = require("typeorm");
const curso_entity_1 = require("../cursos/curso.entity");
const componente_nota_service_1 = require("./componente-nota.service");
let DisciplinaService = class DisciplinaService {
    disciplinaRepository;
    cursoRepository;
    componenteNotaService;
    constructor(disciplinaRepository, cursoRepository, componenteNotaService) {
        this.disciplinaRepository = disciplinaRepository;
        this.cursoRepository = cursoRepository;
        this.componenteNotaService = componenteNotaService;
    }
    async criarDisciplina(criarDisciplinaDTO, userId) {
        const codigoExiste = await this.disciplinaRepository.findOne({
            where: { cod: criarDisciplinaDTO.cod }
        });
        if (codigoExiste) {
            throw new common_1.ConflictException('Código de disciplina já cadastrado');
        }
        const cursos = await this.cursoRepository
            .createQueryBuilder('curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
            .where('curso.id IN (:...ids)', { ids: criarDisciplinaDTO.cursosIds })
            .andWhere('user.id = :userId', { userId })
            .getMany();
        if (cursos.length !== criarDisciplinaDTO.cursosIds.length) {
            throw new common_1.NotFoundException('Um ou mais cursos informados nao foram encontradsos');
        }
        let disciplina = this.disciplinaRepository.create({
            cod: criarDisciplinaDTO.cod,
            nome: criarDisciplinaDTO.nome,
            sigla: criarDisciplinaDTO.sigla,
            periodo: criarDisciplinaDTO.periodo,
            cursos: cursos
        });
        disciplina = await this.disciplinaRepository.save(disciplina);
        if (criarDisciplinaDTO.componentesNota?.length) {
            for (const comp of criarDisciplinaDTO.componentesNota) {
                await this.componenteNotaService.criar({
                    ...comp,
                    id_disciplina: disciplina.id
                });
            }
        }
        return disciplina;
    }
    async listarPorCurso(cursoId, userId) {
        const curso = await this.cursoRepository
            .createQueryBuilder('curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
            .where('curso.id = :cursoId', { cursoId })
            .andWhere('user.id = :userId', { userId })
            .getOne();
        if (!curso) {
            throw new common_1.NotFoundException('Curso não encontrado');
        }
        return await this.disciplinaRepository
            .createQueryBuilder('disciplina')
            .innerJoin('disciplina.cursos', 'curso')
            .leftJoinAndSelect('disciplina.cursos', 'cursos')
            .where('curso.id = :cursoId', { cursoId })
            .getMany();
    }
    async buscarDisciplinaId(id, userId) {
        const disciplina = await this.disciplinaRepository
            .createQueryBuilder('disciplina')
            .innerJoin('disciplina.cursos', 'curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
            .leftJoinAndSelect('disciplina.cursos', 'cursos')
            .where('disciplina.id = :id', { id })
            .andWhere('user.id = :userId', { userId })
            .getOne();
        if (!disciplina) {
            throw new common_1.NotFoundException('Disciplina não encontrada');
        }
        return disciplina;
    }
    async atualizarDisciplina(id, userId, atualizarDisciplinaDTO) {
        const disciplina = await this.buscarDisciplinaId(id, userId);
        if (atualizarDisciplinaDTO.codigo && atualizarDisciplinaDTO.codigo !== disciplina.cod) {
            const codigoExiste = await this.disciplinaRepository.findOne({
                where: { cod: atualizarDisciplinaDTO.codigo }
            });
            if (codigoExiste) {
                throw new common_1.ConflictException('Codigo de disciplina ja cadastrado');
            }
        }
        if (atualizarDisciplinaDTO.cursosIds) {
            const cursos = await this.cursoRepository
                .createQueryBuilder('curso')
                .innerJoin('curso.instituicoes', 'instituicao')
                .innerJoin('instituicao.users', 'user')
                .where('curso.id IN (:...ids)', { ids: atualizarDisciplinaDTO.cursosIds })
                .andWhere('user.id = :userId', { userId })
                .getMany();
            if (cursos.length != atualizarDisciplinaDTO.cursosIds.length) {
                throw new common_1.NotFoundException('Um ou mais cursos informados nao foram encontrados');
            }
            disciplina.cursos = cursos;
        }
        Object.assign(disciplina, {
            codigo: atualizarDisciplinaDTO.codigo ?? disciplina.cod,
            nome: atualizarDisciplinaDTO.nome ?? disciplina.nome,
            sigla: atualizarDisciplinaDTO.sigla ?? disciplina.sigla,
            periodo: atualizarDisciplinaDTO.periodo ?? disciplina.periodo,
        });
        return await this.disciplinaRepository.save(disciplina);
    }
    async deletar(id, userId) {
        const disciplina = await this.buscarDisciplinaId(id, userId);
        await this.disciplinaRepository.remove(disciplina);
        return { message: 'Disciplina excluida com sucesso' };
    }
};
exports.DisciplinaService = DisciplinaService;
exports.DisciplinaService = DisciplinaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(disciplinas_entity_1.DisciplinasEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(curso_entity_1.CursoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        componente_nota_service_1.ComponenteNotaService])
], DisciplinaService);
//# sourceMappingURL=disciplina.service.js.map