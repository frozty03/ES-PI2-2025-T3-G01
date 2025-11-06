import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CriarCursoDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 150)
  nome: string;

  @IsNotEmpty()
  @IsString()
  idInstituicao: string;
}
