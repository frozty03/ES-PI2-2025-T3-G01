import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlunoEntity } from "./aluno.entity";
import { Repository } from "typeorm";
import { TurmaEntity } from "src/turmas/turma.entity";
import { CriarAlunoDTO } from "./dto/criar-aluno.dto";
import { AtualizarAlunoDTO } from "./dto/atualizar-aluno.dto";
import { DeletarLoteAlunoDTO } from "./dto/deletar-lote-aluno.dto";


@Injectable()
export class AlunoService {
    constructor(
        @InjectRepository(AlunoEntity)
        private readonly alunoRepository: Repository<AlunoEntity>,

        @InjectRepository(TurmaEntity)
        private readonly turmaRepository: Repository<TurmaEntity>
    ) {}

    async cadastrarAluno(criarAlunoDTO: CriarAlunoDTO, userId: string): Promise<AlunoEntity> {
        const raExiste = await this.alunoRepository.findOne({
            where: { ra: criarAlunoDTO.ra }
        });

        if (raExiste) {
            throw new ConflictException('Ja existe aluno cadastrado com esse RA!')
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

        if (turmas.length !== criarAlunoDTO.turmaIds.length ) {
            throw new NotFoundException('Uma ou mais turmas informadas nao foram encontradas');
        }

        const aluno = await this.alunoRepository.create({
            ra: criarAlunoDTO.ra,
            nome: criarAlunoDTO.nome,
            turmas: turmas
        });

        return await this.alunoRepository.save(aluno);
    }

    async listarPorTurma(turmaId: string, userId: string): Promise<AlunoEntity[]> {
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
            throw new NotFoundException('Turma nao encontrada');
        }

        return await this.alunoRepository // retornar os alunos associados a turma definida por turmaId
            .createQueryBuilder('aluno')
            .innerJoin('aluno.turmas', 'turma')
            .leftJoinAndSelect('aluno.turmas', 'turmas')
            .where('turma.id = :turmaId', { turmaId })
            .getMany()
    }

    async buscarAlunoId(id: string, userId: string): Promise<AlunoEntity> {
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
                throw new NotFoundException('Aluno não encontrado');
            }
    
            return aluno;
        }

    async deletarAluno(id: string, userId:string): Promise<{ message: string }> {
        const aluno = await this.buscarAlunoId(id, userId);

        await this.alunoRepository.remove(aluno);

        return { message: 'Aluno excluido com sucesso!' };
    }

    async atualizarAluno(atualizarAlunoDTO: AtualizarAlunoDTO, id: string, userId: string): Promise<AlunoEntity> {
        const aluno = await this.buscarAlunoId(id, userId);

        // evitar ra duplicado
        if (atualizarAlunoDTO.ra && atualizarAlunoDTO.ra !== aluno.ra) {
            const raExiste = await this.alunoRepository.findOne({
            where: { ra: atualizarAlunoDTO.ra }
        });

            if (raExiste) {
                throw new ConflictException('Ja existe aluno cadastrado com esse RA!')
            }
        }

        // atualizar as turmas do aluno
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
                throw new NotFoundException('Uma ou mais turmas informadas nao foram encontradas'); // meio desnecessario, mas vamos manter
            }
            aluno.turmas = turmas;
        }
        
        Object.assign(aluno, {
            ra: atualizarAlunoDTO.ra ?? aluno.ra,
            nome: atualizarAlunoDTO.nome ?? aluno.nome
        });
        return await this.alunoRepository.save(aluno);
    }

    async deletarLote(userId: string, deletarLoteAlunoDTO: DeletarLoteAlunoDTO) { // para deletar varios simultaneamente RF023 (se n me engano)
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
            throw new UnauthorizedException('Um ou mais alunos não pertencem a você');
        }

        await this.alunoRepository.remove(alunos);

        return { 
            message: `${alunos.length} aluno(s) deletado(s) com sucesso` 
        };
    }
}