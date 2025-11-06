import { CursoService } from './curso.service';
import { CriarCursoDto } from './criar-curso.dto';
import { ListarCursoDto } from './listar-curso.dto';
export declare class CursoController {
    private readonly cursoService;
    constructor(cursoService: CursoService);
    criarCurso(dto: CriarCursoDto): Promise<ListarCursoDto>;
    listarCursosPorInstituicao(idInstituicao: string): Promise<ListarCursoDto[]>;
    deletarCurso(id: string): Promise<void>;
}
