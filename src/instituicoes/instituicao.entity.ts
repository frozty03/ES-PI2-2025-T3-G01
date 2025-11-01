import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity({ name: 'Instituicoes' })
export class InstituicaoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // conforme SQL: nome varchar(150)
  @Column({ name: 'nome', length: 150, nullable: false })
  nome: string;

  // relação many-to-many com Users através da tabela associativa 'Atua_User_Instituicao'
  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'Atua_User_Instituicao',
    joinColumn: { name: 'id_instituicao', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id_user', referencedColumnName: 'id' },
  })
  users: UserEntity[];
}
