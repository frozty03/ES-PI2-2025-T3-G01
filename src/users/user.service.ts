import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CriarUserDTO } from "./criarUser.dto";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { LoginUserDTO } from "./loginUser.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usuarioRepository: Repository<UserEntity>, // acessar bd aos dados do user
        private readonly jwtService: JwtService
    ) {}

    async createUser(usuarioEntity: UserEntity) {
        const emailExiste = await this.usuarioRepository.findOne({
            where: { email: usuarioEntity.email }
        });

        if (emailExiste) {
            throw new ConflictException('Esse email ja esta cadastrado...')
        }
        
        await this.usuarioRepository.save(usuarioEntity);
    }

    async login(loginUserDTO: LoginUserDTO) {
        const usuario = await this.usuarioRepository.findOne({
            where: { email: loginUserDTO.email }
        });

        if (!usuario) {
            throw new UnauthorizedException('Email ou senha invalidos');
        }

        const senhasCombinam = await bcrypt.compare(
            loginUserDTO.senha, // a senha que foi digitada
            usuario.senha // a senha do user
        );

        if (!senhasCombinam) {
            throw new UnauthorizedException('Email ou senha invalidos');
        }

        const payload = {
            sub: usuario.id, // subject
            nome: usuario.nome
        };

        const tokenAcesso = await this.jwtService.signAsync(payload);

        return {
            acess_token: tokenAcesso,
            message: 'Login realizado com sucesso'
        };
    }

}


