import { ConflictException, Injectable, UnauthorizedException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TurmaEntity } from './turma.entity';
import { DisciplinasEntity } from 'src/disciplinas/disciplinas.entity';
import { CreateTurmaDto } from './dto/criarTurma.dto';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class TurmaService {
  constructor(
    @InjectRepository(TurmaEntity)
    private readonly turmaRepository: Repository<TurmaEntity>,
    @InjectRepository(DisciplinasEntity)
    private readonly disciplinaRepository: Repository<DisciplinasEntity>,
  ) {}

  // criar turma
  async createTurma(turmaCreateDto: CreateTurmaDto, userId: string,): Promise<TurmaEntity> {
        const codigoExiste = await this.turmaRepository.findOne({
            where: { cod: turmaCreateDto.cod },
        });

        if (codigoExiste) {
            throw new ConflictException('Turma já cadastrada');
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
            throw new NotFoundException('Uma ou mais disciplinas informados nao foram encontradsos');
        }

        // criando a turma
        const turma = this.turmaRepository.create({
            cod: turmaCreateDto.cod,
            disciplinas: disciplina
        });

        return await this.turmaRepository.save(turma); 
      }

  // busca todas cadastradas de determinada disciplina
  async listarPorDisciplina(disciplinaId: string, userId: string): Promise<TurmaEntity[]> {
      const disciplina = await this.disciplinaRepository
            .createQueryBuilder('disciplina')
            .innerJoin('disciplina.cursos', 'curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
          .where('disciplina.id = :disciplinaId', { disciplinaId })
          .andWhere('user.id = :userId', { userId })
          .getOne();
  
      if (!disciplina) {
          throw new NotFoundException('Curso não encontrado');
      }
  
      // buscar turmas vinculadas a essa disciplinas
      return await this.turmaRepository
          .createQueryBuilder('turma')
          .innerJoin('turma.disciplinas', 'disciplina')
          .leftJoinAndSelect('turma.disciplinas', 'disciplinas')
          .where('disciplina.id = :disciplinaId', { disciplinaId })
          .getMany();
      }

  // busca uma única turma
  async buscarTurmaPeloId(id: string, userId: string): Promise<TurmaEntity> {
    const turma = await this.turmaRepository
        .createQueryBuilder('turma')
        .innerJoin('turmas.disciplinas', 'disciplina')
        .innerJoin('disciplina.cursos', 'curso')
        .innerJoin('curso.instituicoes', 'instituicao')
        .innerJoin('instituicao.users', 'user')
        .leftJoinAndSelect('turma.disciplinas', 'disciplinas')
        .where('turma.id = :id', { id })
        .andWhere('user.id = :userId', { userId })
        .getOne(); // so para validar que o user ao buscar pelo ID

    if (!turma) {
        throw new NotFoundException('Turma não encontrada');
    }

    return turma;
  }

  async deletarTurma(id: string, userId: string): Promise<{ message: string }> {
        const turma = await this.buscarTurmaPeloId(id, userId);

        await this.turmaRepository.remove(turma);

        return { message: 'Turma excluída com sucesso!' };
    }
}