import { CursoEntity } from './curso.entity';
import { InstituicaoEntity } from '../instituicoes/instituicao.entity';
export declare class OfereceCursoInstituicaoEntity {
    idInstituicao: string;
    idCurso: string;
    instituicao: InstituicaoEntity;
    curso: CursoEntity;
}
