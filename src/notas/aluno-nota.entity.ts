import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { AlunoEntity } from 'src/alunos/aluno.entity';
import { ComponenteNotaEntity } from 'src/disciplinas/componente-nota.entity';
import { TurmaEntity } from 'src/turmas/turma.entity';

@Entity({ name: 'Notas_Aluno_Turma_Componente' })
@Unique(['aluno', 'componenteNota', 'turma'])
export class AlunoNotaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  valor: number | null;

  @ManyToOne(() => AlunoEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'id_aluno' })
  aluno: AlunoEntity;

  @ManyToOne(() => ComponenteNotaEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'id_componente_nota' })
  componenteNota: ComponenteNotaEntity;

  @ManyToOne(() => TurmaEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'id_turma' })
  turma: TurmaEntity;
}
