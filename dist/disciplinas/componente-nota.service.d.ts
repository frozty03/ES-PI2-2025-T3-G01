import { Repository } from "typeorm";
import { ComponenteNotaEntity } from "./componente-nota.entity";
import { CriarComponenteNotaDTO } from "./dto/criar-componente-nota.dto";
import { DisciplinasEntity } from "./disciplinas.entity";
import { AtualizarComponenteNotaDTO } from "./dto/atualizar-componente-nota.dto";
export declare class ComponenteNotaService {
    private readonly componenteNotaRepository;
    private readonly disciplinaRepository;
    constructor(componenteNotaRepository: Repository<ComponenteNotaEntity>, disciplinaRepository: Repository<DisciplinasEntity>);
    criar(dto: CriarComponenteNotaDTO): Promise<ComponenteNotaEntity>;
    atualizar(id: string, dto: AtualizarComponenteNotaDTO): Promise<ComponenteNotaEntity>;
    deletar(id: string): Promise<void>;
    deletarPorDisciplinaId(disciplinaId: string): Promise<void>;
}
