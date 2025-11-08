import { CursoEntity } from "src/cursos/curso.entity";
export declare class DisciplinasEntity {
    id: string;
    cod: number;
    nome: string;
    sigla: string;
    periodo: string;
    cursos: CursoEntity[];
}
