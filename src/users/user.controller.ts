import { Post, Param, Query, Put, Get, Controller, Body } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { CriarUserDTO } from "./criarUser.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { ListarUsuarioDTO } from "./listaUsuario.dto";

@Controller('/usuarios')
export class UserController {
    constructor(
        private usuarioService: UserService
    ) {}

    @Post()
    async criarUser(@Body() dadosDoUsuario: CriarUserDTO) {
        const usuarioEntity = new UserEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.telefone_celular = dadosDoUsuario.telefone_celular;
        usuarioEntity.id = uuid();

        this.usuarioService.createUser(usuarioEntity);

        return {
            usuario: new ListarUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            message: 'Usuario criado com sucesso!'
        };
    }

}