import { AlunoEntity } from "./aluno.entity";
import { Repository } from "typeorm";
import { TurmaEntity } from "src/turmas/turma.entity";
import { CriarAlunoDTO } from "./dto/criar-aluno.dto";
import { AtualizarAlunoDTO } from "./dto/atualizar-aluno.dto";
import { DeletarLoteAlunoDTO } from "./dto/deletar-lote-aluno.dto";
export declare class AlunoService {
    private readonly alunoRepository;
    private readonly turmaRepository;
    constructor(alunoRepository: Repository<AlunoEntity>, turmaRepository: Repository<TurmaEntity>);
    cadastrarAluno(criarAlunoDTO: CriarAlunoDTO, userId: string): Promise<AlunoEntity>;
    listarPorTurma(turmaId: string, userId: string): Promise<AlunoEntity[]>;
    buscarAlunoId(id: string, userId: string): Promise<AlunoEntity>;
    deletarAluno(id: string, userId: string): Promise<{
        message: string;
    }>;
    atualizarAluno(atualizarAlunoDTO: AtualizarAlunoDTO, id: string, userId: string): Promise<AlunoEntity>;
    deletarLote(userId: string, deletarLoteAlunoDTO: DeletarLoteAlunoDTO): Promise<{
        message: string;
    }>;
}
