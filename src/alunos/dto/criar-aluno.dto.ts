import { IsArray, IsNotEmpty, IsString, IsUUID, Length, MaxLength, MinLength } from "class-validator";


export class CriarAlunoDTO {
    @IsNotEmpty({ message: 'Conteudo nao pode ser vazio' })
    @IsString({ message: 'RA deve ser uma string' })
    @MinLength(8, { message: 'RA deve 8 caracteres' })
    @MaxLength(8, { message: 'RA deve 8 caracteres' })
    ra: string;

    @IsNotEmpty({ message: 'Nome deve ser preenchido!' })
    @IsString({ message: 'Nome deve ser uma string' })
    @Length(1, 150, { message: 'Nome deve ter entre 1 a 150 caracteres' })
    nome: string;

    @IsArray({ message: 'Turmas deve ser um array' }) 
    @IsUUID('4', { each: true, message: 'Cada turma deve ter um ID UUID válido' }) 
    @IsNotEmpty({ message: 'Pelo menos uma turma deve ser informado' })
    turmaIds: string[];
}