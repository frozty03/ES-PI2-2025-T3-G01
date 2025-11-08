import { IsArray, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CriarCursoDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 150)
  nome: string;

  // aceitar array de instituições
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  instituicoesIds: string[];
}
