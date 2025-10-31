import { Post, Param, Query, Put, Res, Get, Controller, Body, HttpCode, HttpStatus, HttpException } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { CriarUserDTO } from "./criarUser.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { ListarUsuarioDTO } from "./listaUsuario.dto";
import type { Response } from "express";
import { join } from "path";
import { LoginUserDTO } from "./loginUser.dto";
import { EsqueciSenhaDto } from "./dto/esqueci-senha.dto";
import { ResetarSenhaDto } from "./dto/resetar-senha.dto";
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

    @Get('/login')
    serveLoginPage(@Res() res: Response) {
        res.sendFile(join(process.cwd(), 'public', 'html', 'login.html'));
    }

    @HttpCode(HttpStatus.OK) // retorna 200 ao inves de 201
    @Post('/login')
    async login(@Body() loginUserDTO: LoginUserDTO) {
        return this.usuarioService.login(loginUserDTO); // resultado do service de login do user, passando a info do user
    }

    //ESQUECI SENHA ESTRUTURA
  //onde o link é enviado
    @HttpCode(HttpStatus.OK)
    @Post('esqueci-senha')
  //valida o email recebido
    async esqueciSenha(@Body() esqueciSenhaDto: EsqueciSenhaDto) {
    // captura erros do envio de email
    try {
      //procura o email no bd e envia o link
        return await this.usuarioService.esqueciSenha(esqueciSenhaDto);
    } catch (error) {
        if (error instanceof HttpException) {
        throw error;
        }
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



  //RESETAR SENHA ESTRUTURA
  //recebe o token do linkemail
    @HttpCode(HttpStatus.OK)
    @Post('resetar-senha')
  //valida os dados enseridos no formulario de resetar senha
    async resetarSenha(@Body() resetarSenhaDto: ResetarSenhaDto) {
   //valida os dados e atualiza no bd
    try {
        return await this.usuarioService.resetarSenha(resetarSenhaDto);
    } catch (error) {
        if (error instanceof HttpException) {
        throw error;
        }
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}