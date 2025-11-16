import { AlunoEntity } from 'src/alunos/aluno.entity';
import { ComponenteNotaEntity } from 'src/disciplinas/componente-nota.entity';
import { TurmaEntity } from 'src/turmas/turma.entity';
export declare class AlunoNotaEntity {
    id: string;
    valor: number | null;
    aluno: AlunoEntity;
    componenteNota: ComponenteNotaEntity;
    turma: TurmaEntity;
}
