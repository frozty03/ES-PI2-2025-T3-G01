import { IsOptional, IsString, Length } from "class-validator";


export class AtualizarInstituicaoDTO {
    @IsOptional()
    @IsString()
    @Length(1, 150)
    nome?: string;
}