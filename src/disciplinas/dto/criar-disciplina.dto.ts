import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, Length } from "class-validator";
import { CriarComponenteNotaDTO } from "./criar-componente-nota.dto"

export class CriarDisciplinaDTO {
    @IsNumber({}, { message: 'Código deve ser um número' })
    @IsNotEmpty({ message: 'Código é obrigatório' })
    cod: number;

    @IsString({ message: 'Nome deve ser uma string' })
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @Length(1, 150, { message: 'Nome deve ter entre 1 e 150 caracteres' })
    nome: string;

    @IsString({ message: 'Sigla deve ser uma string' })
    @IsNotEmpty({ message: 'Sigla é obrigatória' })
    @Length(1, 10, { message: 'Sigla deve ter entre 1 e 10 caracteres' })
    sigla: string;

    @IsString({ message: 'Período deve ser uma string' })
    @IsNotEmpty({ message: 'Período é obrigatório' })
    @Length(1, 2, { message: 'Período deve ter 1 ou 2 caracteres' })
    periodo: string;

    @IsArray({ message: 'Cursos deve ser um array' }) // aparecer so para teste no postman
    @IsUUID('4', { each: true, message: 'Cada curso deve ter um ID UUID válido' }) // mesma coisa '-'
    @IsNotEmpty({ message: 'Pelo menos um curso deve ser informado' })
    cursosIds: string[];

    @IsArray()
    componentesNota: CriarComponenteNotaDTO[];
}   
