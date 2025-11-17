// Desenvolvido por Miguel Afonso Castro de Almeida
import { IsOptional, IsString, IsNumber, Length } from "class-validator";

export class AtualizarComponenteNotaDTO {
    @IsOptional()
    @IsString()
    @Length(2, 150)
    nome?: string;

    @IsOptional()
    @IsString()
    @Length(1, 10)
    sigla?: string;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    descricao?: string;

    @IsOptional()
    @IsNumber()
    peso?: number;
}