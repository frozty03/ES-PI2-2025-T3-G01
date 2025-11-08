import { IsArray, IsNumber, IsOptional, IsString, IsUUID, Length } from "class-validator";


export class AtualizarDisciplinaDTO {
    @IsOptional()
    @IsNumber({}, { message: 'Código deve ser um número'})
    codigo?: number; // ? indica q eh opcional

    @IsOptional()
    @IsString()
    @Length(1, 150, { message: 'O nome deve ter entre 1 e 150 caracteres' })
    nome?: string;

    @IsOptional()
    @IsString()
    @Length(1, 10, { message: 'A sigla deve ter entre 1 e 10 caracteres' })
    sigla?: string;

    @IsOptional()
    @IsString()
    @Length(1, 2, { message: 'O periodo deve ter entre 1 e 2 caracteres' })
    periodo?: string;

    @IsOptional()
    @IsArray() // sera convertido automatico em array
    @IsUUID('4', { each: true, message: 'Cada curso deve ter um ID UUID válido' })
    cursosIds?: string[]; // para adicionar ou retirar cursos que contem essa disciplina 
}   
