import { Repository } from 'typeorm';
import { AlunoNotaEntity } from './aluno-nota.entity';
import { AlunoEntity } from 'src/alunos/aluno.entity';
import { ComponenteNotaEntity } from 'src/disciplinas/componente-nota.entity';
import { TurmaEntity } from 'src/turmas/turma.entity';
import { DisciplinasEntity } from 'src/disciplinas/disciplinas.entity';
import { LancarNotaDTO } from './dto/lancar-nota.dto';
export declare class NotasService {
    private readonly alunoNotaRepository;
    private readonly alunoRepository;
    private readonly componenteNotaRepository;
    private readonly turmaRepository;
    private readonly disciplinaRepository;
    constructor(alunoNotaRepository: Repository<AlunoNotaEntity>, alunoRepository: Repository<AlunoEntity>, componenteNotaRepository: Repository<ComponenteNotaEntity>, turmaRepository: Repository<TurmaEntity>, disciplinaRepository: Repository<DisciplinasEntity>);
    lancarNota(lancarNotaDTO: LancarNotaDTO): Promise<AlunoNotaEntity>;
    validarNotasCompletas(turmaId: string, disciplinaId: string): Promise<{
        completas: boolean;
        alunosIncompletos: string[];
    }>;
    exportarNotasCSV(turmaId: string, disciplinaId: string): Promise<{
        filePath: string;
        fileName: string;
    }>;
    obterArquivoCSV(fileName: string): Buffer;
    deletarArquivoTemporario(fileName: string): void;
}
