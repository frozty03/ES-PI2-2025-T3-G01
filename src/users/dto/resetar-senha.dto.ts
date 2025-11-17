// Desenvolvido Julia Da Silva Maia
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetarSenhaDto {
    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    @IsNotEmpty()
    novaSenha: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    @IsNotEmpty()
    confirmaSenha: string;
}