// Feito por:  Davi Froza


import { CursoEntity } from "src/cursos/curso.entity";
import { Column, Entity, JoinTable, ManyToMany,OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TurmaEntity } from "src/turmas/turma.entity";
import { ComponenteNotaEntity } from "src/disciplinas/componente-nota.entity"

@Entity({ name: 'Disciplinas '})
export class DisciplinasEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'cod', type: 'integer', nullable: false, unique: true })
    cod: number;

    @Column({ name: 'nome', length: 150, nullable: false })
    nome: string;

    @Column({ name: 'sigla', length: 10, nullable: false })
    sigla: string;

    @Column({ name: 'periodo', length: 150, nullable: false })
    periodo: string;

    @ManyToMany(() => CursoEntity, (curso) => curso.disciplinas)
    @JoinTable({
        name: 'Compoe_Disciplina_Curso',
        joinColumn: { name: 'id_disciplina', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'id_curso', referencedColumnName: 'id' }
    })
    cursos: CursoEntity[];

    @ManyToMany(() => TurmaEntity, (turma) => turma.disciplinas)
    turmas: TurmaEntity[];
    
    @OneToMany(() => ComponenteNotaEntity, (componente) => componente.disciplina)
    componentesNota: ComponenteNotaEntity[];
}