import { CriarUserDTO } from "./criarUser.dto";
import { UserService } from "./user.service";
import { ListarUsuarioDTO } from "./listaUsuario.dto";
import type { Response } from "express";
import { LoginUserDTO } from "./loginUser.dto";
import { EsqueciSenhaDto } from "./dto/esqueci-senha.dto";
import { ResetarSenhaDto } from "./dto/resetar-senha.dto";
export declare class UserController {
    private usuarioService;
    constructor(usuarioService: UserService);
    serveCadastroPage(res: Response): void;
    criarUser(dadosDoUsuario: CriarUserDTO): Promise<{
        usuario: ListarUsuarioDTO;
        message: string;
    }>;
    serveLoginPage(res: Response): void;
    login(loginUserDTO: LoginUserDTO): Promise<{
        access_token: string;
        id: string;
        nome: string;
        message: string;
    }>;
    esqueciSenha(esqueciSenhaDto: EsqueciSenhaDto): Promise<{
        message: string;
    }>;
    resetarSenha(resetarSenhaDto: ResetarSenhaDto): Promise<{
        message: string;
    }>;
}
