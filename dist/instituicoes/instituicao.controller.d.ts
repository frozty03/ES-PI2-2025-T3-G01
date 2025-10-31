import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './criarInstituicao.dto';
import { ListInstituicoesByUserDto } from './list-instituicoes-by-user.dto';
export declare class InstituicaoController {
    private readonly instituicaoService;
    constructor(instituicaoService: InstituicaoService);
    create(createInstituicaoDto: CreateInstituicaoDto): Promise<import("./instituicao.entity").InstituicaoEntity>;
    findByUser(userId: string): Promise<ListInstituicoesByUserDto>;
}
