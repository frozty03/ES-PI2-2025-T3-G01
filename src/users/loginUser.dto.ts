// Feito por: Davi Froza


import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDTO {
    @IsEmail(undefined, {message: 'O email informado eh invalido'})
    @IsNotEmpty({message: 'O email nao pode ser vazio'})
    email: string;

    @IsString()
    @IsNotEmpty({message: 'A senha nao pode ser vazia'})
    senha: string;
}