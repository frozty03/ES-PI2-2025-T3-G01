import { Post, Param, Query, Put, Res, Get, Controller, Body } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { CriarUserDTO } from "./criarUser.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { ListarUsuarioDTO } from "./listaUsuario.dto";
import type { Response } from "express";
import { join } from "path";
@Controller('/usuarios')
export class UserController {
    constructor(
        private usuarioService: UserService
    ) {}

    @Get('/cadastro')
    serveCadastroPage(@Res() res: Response) {
        res.sendFile(join(process.cwd(), 'public', 'html', 'cadastro.html'));
    }

    @Post('/cadastro')
    async criarUser(@Body() dadosDoUsuario: CriarUserDTO) {
        const usuarioEntity = new UserEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.telefone_celular = dadosDoUsuario.telefone_celular;
        usuarioEntity.id = uuid();

        await this.usuarioService.createUser(usuarioEntity);

        return {
            usuario: new ListarUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            message: 'Usuario criado com sucesso!'
        };
    }

}