import { CriarAlunoDTO } from "./dto/criar-aluno.dto";
import { AtualizarAlunoDTO } from "./dto/atualizar-aluno.dto";
import { AlunoService } from "./aluno.service";
import { DeletarLoteAlunoDTO } from "./dto/deletar-lote-aluno.dto";
export declare class AlunoController {
    private alunoService;
    constructor(alunoService: AlunoService);
    criar(userId: string, criarAlunoDto: CriarAlunoDTO): Promise<{
        aluno: import("./aluno.entity").AlunoEntity;
        message: string;
    }>;
    listarPorTurma(turmaId: string, userId: string): Promise<import("./aluno.entity").AlunoEntity[]>;
    deletarLote(userId: string, deletarLoteAlunoDto: DeletarLoteAlunoDTO): Promise<{
        message: string;
    }>;
    deletarAluno(id: string, userId: string): Promise<{
        message: string;
    }>;
    atualizarAluno(atualizarAlunoDTO: AtualizarAlunoDTO, id: string, userId: string): Promise<{
        aluno: import("./aluno.entity").AlunoEntity;
        message: string;
    }>;
}
