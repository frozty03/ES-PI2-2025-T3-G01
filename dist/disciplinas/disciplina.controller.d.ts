import { DisciplinaService } from "./disciplina.service";
import { CriarDisciplinaDTO } from "./dto/criar-disciplina.dto";
import { ListarDisciplinaDTO } from "./dto/listar-disciplina.dto";
import { AtualizarDisciplinaDTO } from "./dto/atualizar-discplina.dto";
export declare class DisciplinaController {
    private disciplinaService;
    constructor(disciplinaService: DisciplinaService);
    criar(userId: string, criarDisciplinaDTO: CriarDisciplinaDTO): Promise<{
        disciplina: ListarDisciplinaDTO;
        message: string;
    }>;
    listarPorCurso(cursoId: string, userId: string): Promise<ListarDisciplinaDTO[]>;
    atualizar(id: string, userId: string, atualizarDisciplinaDTO: AtualizarDisciplinaDTO): Promise<{
        disciplina: ListarDisciplinaDTO;
        message: string;
    }>;
    deletar(id: string, userId: string): Promise<{
        message: string;
    }>;
}
