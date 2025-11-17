// Lucas Presendo Canhete
import { IsNotEmpty, IsNumber, IsUUID, IsOptional, Min, Max } from 'class-validator';

/*
  DTO usado para lançar ou atualizar uma nota.

  Campos:
  - `idAluno`: UUID do aluno.
  - `idComponenteNota`: UUID do componente de avaliação (ex: P1, T1).
  - `idTurma`: UUID da turma onde a nota será lançada.
  - `valor`: opcional, número entre 0 e 10. Se omitido, será salvo como NULL.
*/
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
