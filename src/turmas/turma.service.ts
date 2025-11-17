// Lucas Presendo Canhete
// Desenvolvido por Miguel Afonso Castro de Almeida
import { ConflictException, Injectable, UnauthorizedException, NotFoundException, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TurmaEntity } from './turma.entity';
import { DisciplinasEntity } from 'src/disciplinas/disciplinas.entity';
import { CreateTurmaDto } from './dto/criarTurma.dto';
import { UserEntity } from '../users/user.entity';
import { AlunoEntity } from '../alunos/aluno.entity';
import { ImportarAlunosDTO } from './dto/importar-alunos.dto';
import { CsvParserService } from './csv-parser.service';

@Injectable()
export class TurmaService {
  constructor(
    @InjectRepository(TurmaEntity)
    private readonly turmaRepository: Repository<TurmaEntity>,
    @InjectRepository(DisciplinasEntity)
    private readonly disciplinaRepository: Repository<DisciplinasEntity>,
    @InjectRepository(AlunoEntity)
    private readonly alunoRepository: Repository<AlunoEntity>,
    private readonly csvParserService: CsvParserService,
  ) {}

  // criar turma
  async createTurma(turmaCreateDto: CreateTurmaDto, userId: string,): Promise<TurmaEntity> {
        for (const disciplinaId of turmaCreateDto.disciplinasIds) {
        const turmaExistente = await this.turmaRepository
            .createQueryBuilder('turma')
            .innerJoin('turma.disciplinas', 'disciplina')
            .where('turma.cod = :cod', { cod: turmaCreateDto.cod })
            .andWhere('disciplina.id = :disciplinaId', { disciplinaId })
            .getOne();

        if (turmaExistente) {
            const disciplina = await this.disciplinaRepository.findOne({
                where: { id: disciplinaId }
            });
            
            throw new ConflictException(
                `Já existe uma turma com código ${turmaCreateDto.cod} na disciplina "${disciplina?.nome || disciplinaId}"`
            );
        }
    }

        const disciplinasDoUsuario = await this.disciplinaRepository
          .createQueryBuilder('disciplina')
          .innerJoin('disciplina.cursos', 'curso')
          .innerJoin('curso.instituicoes', 'instituicao')
          .innerJoin('instituicao.users', 'user')
          .where('disciplina.id IN (:...ids)', { ids: turmaCreateDto.disciplinasIds })
          .andWhere('user.id = :userId', { userId })
          .getMany();

        if (disciplinasDoUsuario.length !== turmaCreateDto.disciplinasIds.length) {
            throw new NotFoundException('Uma ou mais disciplinas informados nao foram encontradsos');
        }

        // criando a turma
        const turma = this.turmaRepository.create({
            cod: turmaCreateDto.cod,
            disciplinas: disciplinasDoUsuario
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
        .innerJoin('turma.disciplinas', 'disciplina')
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

  /**
   * Importa alunos para uma turma a partir de um arquivo CSV
   * O arquivo deve conter duas colunas: matrícula (RA) e nome
   * Outras colunas são ignoradas
   */
  async importarAlunosCSV(
    turmaId: string,
    userId: string,
    csvContent: string,
  ): Promise<{ message: string; alunosImportados: number; alunosJaExistentes: number }> {
    // Validar se a turma existe e pertence ao usuário
    const turma = await this.buscarTurmaPeloId(turmaId, userId);

    // --- Parse do CSV ---
    // Usa o serviço de parsing que retorna uma lista de objetos { ra, nome }
    // O serviço já realiza validações básicas (cabecalho, colunas, truncamento)
    const alunosCSV = this.csvParserService.parseCSV(csvContent);

    let alunosImportados = 0;
    let alunosJaExistentes = 0;
    const alunosParaAdicionar: AlunoEntity[] = [];

    // --- Processamento dos registros ---
    // Para cada registro retornado pelo parser:
    // 1) valida o formato do RA (8 dígitos)
    // 2) busca se já existe no banco
    //    - se existir e não estiver associado à turma: associa e salva
    //    - se existir e já estiver associado: conta como existente
    //    - se não existir: cria objeto para inserir em lote
    for (const alunoCSV of alunosCSV) {
      // Validar RA (deve ter exatamente 8 caracteres numéricos)
      if (alunoCSV.ra.length !== 8 || isNaN(Number(alunoCSV.ra))) {
        throw new BadRequestException(
          `RA inválido: "${alunoCSV.ra}". Deve conter 8 dígitos numéricos`,
        );
      }

      // Procurar aluno existente pelo RA (incluindo turmas associadas)
      let aluno = await this.alunoRepository.findOne({
        where: { ra: alunoCSV.ra },
        relations: ['turmas'],
      });

      if (aluno) {
        // Aluno já existe no sistema
        const jaEstaAssociado = aluno.turmas.some((t) => t.id === turmaId);

        if (!jaEstaAssociado) {
          // Associa a turma ao aluno existente e salva a alteração
          aluno.turmas.push(turma);
          await this.alunoRepository.save(aluno);
          alunosImportados++;
        } else {
          // Aluno já estava associado à turma — contar como existente
          alunosJaExistentes++;
        }
      } else {
        // Aluno não existe — preparar para criação em lote (melhor performance)
        const novoAluno = this.alunoRepository.create({
          ra: alunoCSV.ra,
          nome: alunoCSV.nome,
          turmas: [turma],
        });
        alunosParaAdicionar.push(novoAluno);
      }
    }

    // Salvar todos os novos alunos em uma única operação
    if (alunosParaAdicionar.length > 0) {
      await this.alunoRepository.save(alunosParaAdicionar);
      alunosImportados += alunosParaAdicionar.length;
    }

    return {
      message: `Importação concluída com sucesso!`,
      alunosImportados,
      alunosJaExistentes,
    };
  }
}