// Desenvolvido por Miguel Afonso Castro de Almeida
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class ImportarAlunosDTO {
  @IsUUID('4', { message: 'ID da turma deve ser um UUID válido' })
  @IsNotEmpty({ message: 'ID da turma é obrigatório' })
  turmaId: string;

  @IsArray({ message: 'Alunos deve ser um array' })
  @IsNotEmpty({ message: 'Lista de alunos não pode ser vazia' })
  alunos: {
    ra: string;
    nome: string;
  }[];
}
