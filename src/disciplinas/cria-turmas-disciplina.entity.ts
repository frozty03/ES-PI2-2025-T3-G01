import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DisciplinasEntity } from "src/disciplinas/disciplinas.entity";
import { TurmaEntity } from 'src/turmas/turma.entity';

@Entity({ name: 'Cria_Turmas_Disciplina' })
export class CriaTurmasDisciplinaEntity {
  @PrimaryColumn('uuid', { name: 'id_turma' })
  idTurma: string;

  @PrimaryColumn('uuid', { name: 'id_disciplina' })
  idDisciplina: string;

  @ManyToOne(() => DisciplinasEntity, (disciplina) => disciplina.id, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_disciplina' })
  disciplina: DisciplinasEntity;

  @ManyToOne(() => TurmaEntity, (turma) => turma.id, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'turma' })
  turma: TurmaEntity;
}