import { TurmaEntity } from "src/turmas/turma.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'Alunos' })
export class AlunoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'ra', length: 8, unique: true, nullable: false }) 
    ra: string;

    @Column({ name: 'nome', length: 150, nullable: false })
    nome: string;

    @ManyToMany(() => TurmaEntity, (turma) => turma.alunos)
    @JoinTable({
        name: 'Participa_Aluno_Turma',
        joinColumn: { name: 'id_aluno', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'id_turma', referencedColumnName: 'id'}
    })
    turmas: TurmaEntity[];
}