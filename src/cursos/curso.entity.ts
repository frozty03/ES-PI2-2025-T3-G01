// Lucas Presendo Canhete
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { InstituicaoEntity } from '../instituicoes/instituicao.entity';
import { DisciplinasEntity } from 'src/disciplinas/disciplinas.entity';

/*
  Entidade que representa um Curso.

  - `instituicoes`: many-to-many com `InstituicaoEntity`.
  - `disciplinas`: many-to-many com `DisciplinasEntity`.
*/
@Entity({ name: 'Curso' })
export class CursoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Nome do curso (varchar(150) no banco)
  @Column({ name: 'nome', length: 150, nullable: false })
  nome: string;

  // Instituições que oferecem este curso
  @ManyToMany(() => InstituicaoEntity, (instituicao) => instituicao.cursos)
  instituicoes: InstituicaoEntity[];

  // Disciplinas vinculadas a este curso
  @ManyToMany(() => DisciplinasEntity, (disciplinas) => disciplinas.cursos)
  disciplinas: DisciplinasEntity[];
}
