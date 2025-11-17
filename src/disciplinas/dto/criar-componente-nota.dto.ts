// Desenvolvido por Miguel Afonso Castro de Almeida
import { IsNotEmpty, IsNumber, IsUUID, Length } from 'class-validator';

export class CriarComponenteNotaDTO {
  @IsNotEmpty()
  @Length(2, 150)
  nome: string;

  @IsNotEmpty()
  @Length(1, 10)
  sigla: string;
  
  @IsNotEmpty()
  @Length(1, 255)
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  peso: number;

  @IsNotEmpty()
  @IsUUID()
  id_disciplina: string;
}