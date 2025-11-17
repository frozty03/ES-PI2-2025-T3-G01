import { IsOptional, IsString, Length } from "class-validator";


export class AtualizarCursoDto {
    @IsOptional()
    @IsString()
    @Length(1, 150)
    nome?: string;
}