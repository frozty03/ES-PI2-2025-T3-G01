import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<UserEntity>);
    createUser(usuarioEntity: UserEntity): Promise<void>;
}
