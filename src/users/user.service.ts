import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"; // repository pattern
import { CriarUserDTO } from "./criarUser.dto";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { LoginUserDTO } from "./loginUser.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { EsqueciSenhaDto } from "./dto/esqueci-senha.dto";
import { ResetarSenhaDto } from "./dto/resetar-senha.dto";
import * as nodemailer from 'nodemailer';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
    private transporter;
    constructor(
        @InjectRepository(UserEntity)
        private readonly usuarioRepository: Repository<UserEntity>, // acessar bd aos dados do user
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                // conta do email que envia
                user: 'notadezpi@gmail.com',
                // senha gerada pelo proprio google
                pass: 'vnzouynvuabhgodf',
            },
        });
    }

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
            access_token: tokenAcesso,
            id: usuario.id, // informações para personalização no front da tela principal
            nome: usuario.nome,
            message: 'Login realizado com sucesso'
        };
    }

      // ESQUECI A SENHA ESTRUTURA
    async esqueciSenha(
        esqueciSenhaDto: EsqueciSenhaDto,
        ): Promise<{ message: string }> {
    const { email } = esqueciSenhaDto;
    //pega o email no bd
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    
    if (!usuario) {
      //se nao achar o email no bd retorna um erro
        console.log(`Tentativa de reset de senha para email não existente: ${email}`);
        return {
        message:
            'Um link de recuperação foi enviado.',
        };
    }
    //gera um tempo de duração do link
    const payload = { sub: usuario.id, email: usuario.email };
    const token = await this.jwtService.signAsync(payload, {
        expiresIn: '20m', 
    });

    //cria o link da pagina de resetar a senha
    const appUrl = this.configService.get<string>('APP_URL');
    const resetLink = `${appUrl}/html/linkemail.html?token=${token}`;

    //como o email que foi enviado vai aparecer
    const mailOptions = {
      //mostra quem enviou
        from: `"NotaDez" <notadezpi@gmail.com>`,
        to: usuario.email,
      //o assunto do email
        subject: 'Recuperação de Senha - NotaDez',
      //um pequeno texto 
        html: `
        <p>Olá, ${usuario.nome},</p>
        <p>Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para criar uma nova senha:</p>
        <a href="${resetLink}">Redefinir Senha</a>
        <p>Este link expira em 20 minutos.</p>
        <p>Se você não solicitou isso, por favor ignore este email.</p>
        `,
    };
    //tenta enviar o email
    try {
        await this.transporter.sendMail(mailOptions);
        return {
        message:
            'Um link de recuperação foi enviado.',
        };
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        throw new InternalServerErrorException('Não foi possível enviar o email de recuperação.');
        }
    }

  // -RESETAR SENHA ESTRUTURA-
    async resetarSenha(
        resetarSenhaDto: ResetarSenhaDto,
        ): Promise<{ message: string }> {
    const { token, novaSenha, confirmaSenha } = resetarSenhaDto;

      //valida a nova senha com a confirmação
    if (novaSenha !== confirmaSenha) {
        throw new ConflictException('As senhas não coincidem.');
    }

    let payload: any;
    try {
        const secret = this.configService.get<string>('JWT_SECRET');
        payload = await this.jwtService.verifyAsync(token, {
        //verifica o token
        secret: secret,
        });
    } catch (error) {
        throw new UnauthorizedException('Token inválido ou expirado.');
    }


    //puxa o usuario no bd 
    const usuario = await this.usuarioRepository.findOne({
        where: { id: payload.sub },
    });

    if (!usuario) {
        throw new NotFoundException('Usuário não encontrado.');
    }
    
    //faz a criptografia da senha
    const salt = await bcrypt.genSalt();
    const hashedSenha = await bcrypt.hash(novaSenha, salt);

    //atualiza a senha no bd
    await this.usuarioRepository.update(usuario.id, {
        senha: hashedSenha,
    });

        return { message: 'Senha atualizada com sucesso!' };
    }

}


