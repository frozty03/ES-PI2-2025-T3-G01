import { DisciplinasEntity } from "./disciplinas.entity";
import { Repository } from "typeorm";
import { CursoEntity } from "src/cursos/curso.entity";
import { CriarDisciplinaDTO } from "./dto/criar-disciplina.dto";
import { AtualizarDisciplinaDTO } from "./dto/atualizar-discplina.dto";
import { ComponenteNotaService } from "./componente-nota.service";
export declare class DisciplinaService {
    private readonly disciplinaRepository;
    private readonly cursoRepository;
    private readonly componenteNotaService;
    constructor(disciplinaRepository: Repository<DisciplinasEntity>, cursoRepository: Repository<CursoEntity>, componenteNotaService: ComponenteNotaService);
    criarDisciplina(criarDisciplinaDTO: CriarDisciplinaDTO, userId: string): Promise<DisciplinasEntity>;
    listarPorCurso(cursoId: string, userId: string): Promise<DisciplinasEntity[]>;
    buscarDisciplinaId(id: string, userId: string): Promise<DisciplinasEntity>;
    atualizarDisciplina(id: string, userId: string, atualizarDisciplinaDTO: AtualizarDisciplinaDTO): Promise<DisciplinasEntity>;
    deletar(id: string, userId: string): Promise<{
        message: string;
    }>;
}
