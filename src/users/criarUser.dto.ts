import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CriarUserDTO {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    telefone_celular: string;

    @MinLength(6)
    @IsNotEmpty()
    senha: string;
}