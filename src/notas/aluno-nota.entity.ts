// Lucas Presendo Canhete
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { AlunoEntity } from 'src/alunos/aluno.entity';
import { ComponenteNotaEntity } from 'src/disciplinas/componente-nota.entity';
import { TurmaEntity } from 'src/turmas/turma.entity';

/*
  Entidade que representa a nota de um aluno para um componente
  em uma turma específica.

  - A tabela se chama `Notas_Aluno_Turma_Componente` no banco.
  - Existe uma restrição UNIQUE para evitar múltiplos registros
    para o mesmo (aluno, componente, turma).
*/
@Entity({ name: 'Notas_Aluno_Turma_Componente' })
@Unique(['aluno', 'componenteNota', 'turma'])
export class AlunoNotaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Valor da nota (pode ser NULL quando ainda não lançada)
  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  valor: number | null;

  // Relação com o aluno. Ao deletar o aluno, as notas são removidas (CASCADE).
  @ManyToOne(() => AlunoEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'id_aluno' })
  aluno: AlunoEntity;

  // Relação com o componente de nota (ex: P1, P2, T1...).
  @ManyToOne(() => ComponenteNotaEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'id_componente_nota' })
  componenteNota: ComponenteNotaEntity;

  // Relação com a turma à qual a nota pertence.
  @ManyToOne(() => TurmaEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'id_turma' })
  turma: TurmaEntity;
}
