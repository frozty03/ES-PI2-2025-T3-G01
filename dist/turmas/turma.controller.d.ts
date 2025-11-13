import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/criarTurma.dto';
export declare class TurmasController {
    private turmaService;
    constructor(turmaService: TurmaService);
    criar(userId: string, createTurmaDTO: CreateTurmaDto): Promise<{
        turma: import("./turma.entity").TurmaEntity;
        message: string;
    }>;
    listarPorDisciplina(disciplinaId: string, userId: string): Promise<import("./turma.entity").TurmaEntity[]>;
    deletar(id: string, userId: string): Promise<{
        message: string;
    }>;
    importarAlunos(turmaId: string, userId: string, arquivo: any): Promise<{
        message: string;
        alunosImportados: number;
        alunosJaExistentes: number;
    }>;
}
