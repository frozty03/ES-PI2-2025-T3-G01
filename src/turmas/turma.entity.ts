import { Entity, Column,JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { DisciplinasEntity } from "src/disciplinas/disciplinas.entity";
import { AlunoEntity } from "src/alunos/aluno.entity";

@Entity({ name: 'Turmas' }) // nome da tabela
export class TurmaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'cod', type: "integer", nullable: false}) // campo código
    cod: number;

    @ManyToMany(() => DisciplinasEntity, (disciplina) => disciplina.turmas)
    @JoinTable({
        name: 'Cria_Turmas_Disciplina',
        joinColumn: { name: 'id_turma', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'id_disciplina', referencedColumnName: 'id' }
    })
    disciplinas: DisciplinasEntity[];

    @ManyToMany(() => AlunoEntity, (aluno) => aluno.turmas)
    alunos: AlunoEntity[];
}