import { IsNotEmpty, IsInt, Length, IsArray, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTurmaDto {
  @Type(() => Number) // converte valor recebido para númerico
  @IsNotEmpty()
  cod: number;

  @IsArray({ message: 'Disciplina deve ser um array' }) // aparecer so para teste no postman
  @IsUUID('4', { each: true, message: 'Cada disciplina deve ter um ID UUID válido' }) // mesma coisa '-'
  @IsNotEmpty({ message: 'Pelo menos uma disciplina deve ser informado' })
  disciplinasIds: string[];
}
