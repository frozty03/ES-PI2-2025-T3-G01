import { Repository } from 'typeorm';
import { TurmaEntity } from './turma.entity';
import { DisciplinasEntity } from 'src/disciplinas/disciplinas.entity';
import { CreateTurmaDto } from './dto/criarTurma.dto';
import { AlunoEntity } from '../alunos/aluno.entity';
import { CsvParserService } from './csv-parser.service';
export declare class TurmaService {
    private readonly turmaRepository;
    private readonly disciplinaRepository;
    private readonly alunoRepository;
    private readonly csvParserService;
    constructor(turmaRepository: Repository<TurmaEntity>, disciplinaRepository: Repository<DisciplinasEntity>, alunoRepository: Repository<AlunoEntity>, csvParserService: CsvParserService);
    createTurma(turmaCreateDto: CreateTurmaDto, userId: string): Promise<TurmaEntity>;
    listarPorDisciplina(disciplinaId: string, userId: string): Promise<TurmaEntity[]>;
    buscarTurmaPeloId(id: string, userId: string): Promise<TurmaEntity>;
    deletarTurma(id: string, userId: string): Promise<{
        message: string;
    }>;
    importarAlunosCSV(turmaId: string, userId: string, csvContent: string): Promise<{
        message: string;
        alunosImportados: number;
        alunosJaExistentes: number;
    }>;
}
