import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DisciplinasEntity } from './disciplinas.entity';

@Entity({ name: 'Componente_Nota' })
export class ComponenteNotaEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 150 })
    nome: string;

    @Column({ type: 'numeric', precision: 4, scale: 2 })
    peso: number;

    @Column({ length: 10 })
    sigla: string;

    @Column({ length: 255 })
    descricao: string;

    @ManyToOne(() => DisciplinasEntity, (disciplina) => disciplina.componentesNota, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        nullable: false,
    })
    disciplina: DisciplinasEntity;

}