import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CursoEntity } from './curso.entity';
import { InstituicaoEntity } from '../instituicoes/instituicao.entity';

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
