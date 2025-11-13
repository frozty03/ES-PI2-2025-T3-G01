import { ComponenteNotaEntity } from "./componente-nota.entity";
import { Repository } from "typeorm";
import { CriarComponenteDTO } from "./dto/criar-componente-nota.dto";
import { TurmaEntity } from "src/turmas/turma.entity";
export declare class ComponenteService {
    private readonly componenteRepository;
    private readonly turmaRepository;
    constructor(componenteRepository: Repository<ComponenteNotaEntity>, turmaRepository: Repository<TurmaEntity>);
    cadastrarComponente(criarComponenteDTO: CriarComponenteDTO, userId: string): Promise<ComponenteNotaEntity>;
}
