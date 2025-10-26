import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CriarUserDTO } from "./criarUser.dto";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usuarioRepository: Repository<UserEntity> // acessar bd aos dados do user
    ) {}

    async createUser(usuarioEntity: UserEntity) {
        await this.usuarioRepository.save(usuarioEntity);
    }

}


