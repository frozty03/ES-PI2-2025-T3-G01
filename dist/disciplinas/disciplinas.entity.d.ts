import { CursoEntity } from "src/cursos/curso.entity";
import { TurmaEntity } from "src/turmas/turma.entity";
import { ComponenteNotaEntity } from "src/disciplinas/componente-nota.entity";
export declare class DisciplinasEntity {
    id: string;
    cod: number;
    nome: string;
    sigla: string;
    periodo: string;
    cursos: CursoEntity[];
    turmas: TurmaEntity[];
    componentesNota: ComponenteNotaEntity[];
}
