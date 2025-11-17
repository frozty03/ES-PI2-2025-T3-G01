// Lucas Presendo Canhete
import { IsArray, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

/*
  DTO para criação de Curso.

  - `nome`: nome do curso (1-150 caracteres).
  - `instituicoesIds`: array de UUIDs das instituições que oferecem o curso.
*/
export class CriarCursoDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 150)
  nome: string;

  // aceitar array de instituições (UUIDs)
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  instituicoesIds: string[];
}
