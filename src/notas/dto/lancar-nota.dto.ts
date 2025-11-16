import { IsNotEmpty, IsNumber, IsUUID, IsOptional, Min, Max } from 'class-validator';

export class LancarNotaDTO {
  @IsNotEmpty()
  @IsUUID()
  idAluno: string;

  @IsNotEmpty()
  @IsUUID()
  idComponenteNota: string;

  @IsNotEmpty()
  @IsUUID()
  idTurma: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  valor?: number;
}
