import { CriarComponenteNotaDTO } from "./criar-componente-nota.dto";
export declare class CriarDisciplinaDTO {
    cod: number;
    nome: string;
    sigla: string;
    periodo: string;
    cursosIds: string[];
    componentesNota: CriarComponenteNotaDTO[];
}
