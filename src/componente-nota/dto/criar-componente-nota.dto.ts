import { IsArray, IsNotEmpty, IsString,IsNumber,Min, IsUUID, Length, MaxLength, MinLength } from "class-validator";
import { Type } from 'class-transformer';

export class CriarComponenteDTO {
    @IsNotEmpty({ message: 'Nome deve ser preenchido!' })
    @IsString({ message: 'Nome deve ser uma string' })
    @Length(1, 150, { message: 'Nome deve ter entre 1 a 150 caracteres' })
    nome: string;

    @Type(() => Number) // converte valor recebido para númerico
    @IsNotEmpty({ message: 'Peso deve ser preenchido' })
    @IsNumber({}, { message: 'Peso deve ser um número' })
    peso: number;
}