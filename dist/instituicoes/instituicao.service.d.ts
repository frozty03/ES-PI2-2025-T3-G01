import { Repository } from 'typeorm';
import { InstituicaoEntity } from './instituicao.entity';
import { CreateInstituicaoDto } from './criarInstituicao.dto';
import { ListInstituicoesByUserDto } from './list-instituicoes-by-user.dto';
export declare class InstituicaoService {
    private readonly instituicaoRepository;
    constructor(instituicaoRepository: Repository<InstituicaoEntity>);
    createInstituicao(createInstituicaoDto: CreateInstituicaoDto): Promise<InstituicaoEntity>;
    findByUserId(userId: string): Promise<ListInstituicoesByUserDto>;
}
