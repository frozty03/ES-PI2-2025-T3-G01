// Feito por: Davi Froza 

import { IsArray, IsOptional, IsString, IsUUID, Length, MaxLength, MinLength } from "class-validator";


export class AtualizarAlunoDTO {
    @IsOptional()
    @IsString({ message: 'RA deve ser uma string' })
    @MinLength(8, { message: 'RA deve 8 caracteres' })
    @MaxLength(8, { message: 'RA deve 8 caracteres' })
    ra?: string;

    @IsOptional()
    @IsString({ message: 'Nome deve ser uma string' })
    @Length(1, 150, { message: 'Nome deve ter entre 1 a 150 caracteres' })
    nome?: string;

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true, message: 'Cada turma deve ter um ID UUID válido' }) 
    turmaIds?: string[];
}