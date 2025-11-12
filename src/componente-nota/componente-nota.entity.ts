import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Componente_Nota' })
export class ComponenteNotaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'nome', length: 150, nullable: false })
    nome: string;

    @Column({ name: 'peso', type: "numeric", precision: 4, scale: 2, nullable: false })
    peso: number;
}