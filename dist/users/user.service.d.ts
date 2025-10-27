import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { LoginUserDTO } from "./loginUser.dto";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private readonly usuarioRepository;
    private readonly jwtService;
    constructor(usuarioRepository: Repository<UserEntity>, jwtService: JwtService);
    createUser(usuarioEntity: UserEntity): Promise<void>;
    login(loginUserDTO: LoginUserDTO): Promise<{
        acess_token: string;
        message: string;
    }>;
}
