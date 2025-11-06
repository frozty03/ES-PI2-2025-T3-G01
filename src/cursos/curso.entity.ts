import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { InstituicaoEntity } from '../instituicoes/instituicao.entity';
import { DisciplinasEntity } from 'src/disciplinas/disciplinas.entity';

@Entity({ name: 'Curso' })
export class CursoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 150, nullable: false })
  nome: string;

  @ManyToMany(() => InstituicaoEntity, (instituicao) => instituicao.cursos)
  instituicoes: InstituicaoEntity[];

  @ManyToMany(() => DisciplinasEntity, (disciplinas) => disciplinas.cursos)
  disciplinas: DisciplinasEntity[];
}
