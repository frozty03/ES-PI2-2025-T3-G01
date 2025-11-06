import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { LoginUserDTO } from "./loginUser.dto";
import { JwtService } from "@nestjs/jwt";
import { EsqueciSenhaDto } from "./dto/esqueci-senha.dto";
import { ResetarSenhaDto } from "./dto/resetar-senha.dto";
import { ConfigService } from "@nestjs/config";
export declare class UserService {
    private readonly usuarioRepository;
    private readonly jwtService;
    private readonly configService;
    private transporter;
    constructor(usuarioRepository: Repository<UserEntity>, jwtService: JwtService, configService: ConfigService);
    createUser(usuarioEntity: UserEntity): Promise<void>;
    login(loginUserDTO: LoginUserDTO): Promise<{
        acess_token: string;
        message: string;
    }>;
    esqueciSenha(esqueciSenhaDto: EsqueciSenhaDto): Promise<{
        message: string;
    }>;
    resetarSenha(resetarSenhaDto: ResetarSenhaDto): Promise<{
        message: string;
    }>;
}
