import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Users' }) // nome da tabela
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'nome', length: 100, nullable: false}) // campo nome
    nome: string;

    @Column({ name: 'email', length: 70, nullable: false}) // campo nome
    email: string;

    @Column({ name: 'telefone_celular', length: 20, nullable: false}) // campo nome
    telefone_celular: string;

    @Column({ name: 'senha', length: 20, nullable: false}) // campo nome
    senha: string;

    @CreateDateColumn({ name: 'created_at' })
    createAt: string;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}