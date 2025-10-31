import { CriarUserDTO } from "./criarUser.dto";
import { UserService } from "./user.service";
import { ListarUsuarioDTO } from "./listaUsuario.dto";
import type { Response } from "express";
import { LoginUserDTO } from "./loginUser.dto";
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
        acess_token: string;
        message: string;
    }>;
}
