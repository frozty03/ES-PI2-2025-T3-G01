import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './criarInstituicao.dto';
import { ListInstituicoesByUserDto } from './list-instituicoes-by-user.dto';
export declare class InstituicaoController {
    private readonly instituicaoService;
    constructor(instituicaoService: InstituicaoService);
    create(userId: string, createInstituicaoDto: CreateInstituicaoDto): Promise<import("./instituicao.entity").InstituicaoEntity>;
    delete(id: string, userId: string): Promise<{
        success: boolean;
    }>;
    findByUser(userId: string): Promise<ListInstituicoesByUserDto>;
}
