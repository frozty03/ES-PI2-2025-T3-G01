import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity({ name: 'Turmas' }) // nome da tabela
export class TurmaEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'nome', length: 100, nullable: false}) // campo código
    cod: number;
}