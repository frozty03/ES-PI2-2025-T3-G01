// Lucas Presendo Canhete
import { IsNotEmpty, IsString, Length } from 'class-validator';

/*
  DTO para criação de Instituições.

  - `nome`: nome da instituição (obrigatório, 1-150 caracteres).
*/
export class CreateInstituicaoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  nome: string;
}
