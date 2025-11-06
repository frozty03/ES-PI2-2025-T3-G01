import { InstituicaoEntity } from '../instituicoes/instituicao.entity';
import { DisciplinasEntity } from 'src/disciplinas/disciplinas.entity';
export declare class CursoEntity {
    id: string;
    nome: string;
    instituicoes: InstituicaoEntity[];
    disciplinas: DisciplinasEntity[];
}
