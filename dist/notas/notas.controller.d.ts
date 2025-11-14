import type { Response } from 'express';
import { NotasService } from './notas.service';
import { LancarNotaDTO } from './dto/lancar-nota.dto';
export declare class NotasController {
    private readonly notasService;
    constructor(notasService: NotasService);
    lancarNota(lancarNotaDTO: LancarNotaDTO): Promise<{
        nota: import("./aluno-nota.entity").AlunoNotaEntity;
        message: string;
    }>;
    validarNotas(turmaId: string, disciplinaId: string): Promise<{
        completas: boolean;
        alunosIncompletos: string[];
    }>;
    exportarNotas(turmaId: string, disciplinaId: string, res: Response): Promise<void>;
}
