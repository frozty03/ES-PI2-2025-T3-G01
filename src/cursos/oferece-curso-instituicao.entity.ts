// Lucas Presendo Canhete
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CursoEntity } from './curso.entity';
import { InstituicaoEntity } from '../instituicoes/instituicao.entity';

/*
  Entidade de junção que representa a relação many-to-many entre
  `Curso` e `Instituicao` quando é necessário expor colunas adicionais
  ou usar uma tabela explícita.

  - Usa duas colunas primárias compostas: `id_instituicao` e `id_curso`.
  - As relações com `InstituicaoEntity` e `CursoEntity` são configuradas
    com `eager: true` para carregar dados automaticamente.
*/
@Entity({ name: 'Oferece_Curso_Instituicao' })
export class OfereceCursoInstituicaoEntity {
  @PrimaryColumn('uuid', { name: 'id_instituicao' })
  idInstituicao: string;

  @PrimaryColumn('uuid', { name: 'id_curso' })
  idCurso: string;

  @ManyToOne(() => InstituicaoEntity, (instituicao) => instituicao.id, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_instituicao' })
  instituicao: InstituicaoEntity;

  @ManyToOne(() => CursoEntity, (curso) => curso.id, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_curso' })
  curso: CursoEntity;
}
