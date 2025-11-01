import { Repository } from 'typeorm';
import { InstituicaoEntity } from './instituicao.entity';
import { CreateInstituicaoDto } from './criarInstituicao.dto';
import { ListInstituicoesByUserDto } from './list-instituicoes-by-user.dto';
import { UserEntity } from '../users/user.entity';
export declare class InstituicaoService {
    private readonly instituicaoRepository;
    private readonly userRepository;
    constructor(instituicaoRepository: Repository<InstituicaoEntity>, userRepository: Repository<UserEntity>);
    createInstituicao(createInstituicaoDto: CreateInstituicaoDto, userId: string): Promise<InstituicaoEntity>;
    findByUserId(userId: string): Promise<ListInstituicoesByUserDto>;
    deleteInstituicao(instituicaoId: string, userId: string): Promise<{
        success: boolean;
    }>;
}
