import { Repository } from 'typeorm';
import { TurmaEntity } from './turma.entity';
import { DisciplinasEntity } from 'src/disciplinas/disciplinas.entity';
import { CreateTurmaDto } from './dto/criarTurma.dto';
export declare class TurmaService {
    private readonly turmaRepository;
    private readonly disciplinaRepository;
    constructor(turmaRepository: Repository<TurmaEntity>, disciplinaRepository: Repository<DisciplinasEntity>);
    createTurma(turmaCreateDto: CreateTurmaDto, userId: string): Promise<TurmaEntity>;
    listarPorDisciplina(disciplinaId: string, userId: string): Promise<TurmaEntity[]>;
    buscarTurmaPeloId(id: string, userId: string): Promise<TurmaEntity>;
    deletarTurma(id: string, userId: string): Promise<{
        message: string;
    }>;
}
