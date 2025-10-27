import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';

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

    @Column({ name: 'senha', length: 255, nullable: false}) // campo nome
    senha: string;

    @CreateDateColumn({ name: 'created_at' })
    createAt: string;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt(); // salt eh um texto aleatorio que vai ser usado para criptografar
        this.senha = await bcrypt.hash(this.senha, salt); // atualizar a senha
    }
}