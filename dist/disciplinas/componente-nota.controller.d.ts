import { ComponenteNotaService } from './componente-nota.service';
import { AtualizarComponenteNotaDTO } from './dto/atualizar-componente-nota.dto';
export declare class ComponenteNotaController {
    private readonly componenteNotaService;
    constructor(componenteNotaService: ComponenteNotaService);
    atualizarComponenteNota(id: string, dto: AtualizarComponenteNotaDTO): Promise<import("./componente-nota.entity").ComponenteNotaEntity>;
    deletarComponenteNota(id: string): Promise<{
        message: string;
    }>;
}
