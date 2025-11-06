import { UserEntity } from '../users/user.entity';
import { CursoEntity } from '../cursos/curso.entity';
export declare class InstituicaoEntity {
    id: string;
    nome: string;
    users: UserEntity[];
    cursos: CursoEntity[];
}
