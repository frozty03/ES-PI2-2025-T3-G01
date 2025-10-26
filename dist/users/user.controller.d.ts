import { CriarUserDTO } from "./criarUser.dto";
import { UserService } from "./user.service";
import { ListarUsuarioDTO } from "./listaUsuario.dto";
export declare class UserController {
    private usuarioService;
    constructor(usuarioService: UserService);
    criarUser(dadosDoUsuario: CriarUserDTO): Promise<{
        usuario: ListarUsuarioDTO;
        message: string;
    }>;
}
