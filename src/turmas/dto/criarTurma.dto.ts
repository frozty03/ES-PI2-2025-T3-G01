import { IsNotEmpty, IsInt, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTurmaDto {
  @Type(() => Number) // converte valor recebido para númerico
  @IsInt()
  @IsNotEmpty()
  @Length(1, 150)
  cod: number;
}
