import { Repository } from 'typeorm';
import { CursoEntity } from './curso.entity';
import { InstituicaoEntity } from '../instituicoes/instituicao.entity';
import { CriarCursoDto } from './criar-curso.dto';
import { ListarCursoDto } from './listar-curso.dto';
export declare class CursoService {
    private readonly cursoRepository;
    private readonly instituicaoRepository;
    constructor(cursoRepository: Repository<CursoEntity>, instituicaoRepository: Repository<InstituicaoEntity>);
    criarCurso(dto: CriarCursoDto): Promise<ListarCursoDto>;
    listarCursosPorInstituicao(idInstituicao: string): Promise<ListarCursoDto[]>;
    deletarCurso(id: string): Promise<void>;
}
