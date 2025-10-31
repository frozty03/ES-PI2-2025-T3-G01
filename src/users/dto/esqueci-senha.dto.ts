import { IsEmail, IsNotEmpty } from 'class-validator';

export class EsqueciSenhaDto {
    @IsEmail({}, { message: 'Formato de email inválido' })
    @IsNotEmpty({ message: 'O email não pode estar vazio' })
    email: string;
}