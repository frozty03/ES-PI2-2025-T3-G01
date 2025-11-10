import { DisciplinasEntity } from "src/disciplinas/disciplinas.entity";
import { AlunoEntity } from "src/alunos/aluno.entity";
export declare class TurmaEntity {
    id: string;
    cod: number;
    disciplinas: DisciplinasEntity[];
    alunos: AlunoEntity[];
}
