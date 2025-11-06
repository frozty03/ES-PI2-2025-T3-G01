export declare class ListarDisciplinaDTO {
    readonly id: string;
    readonly codigo: number;
    readonly nome: string;
    readonly sigla: string;
    readonly periodo: string;
    readonly cursos: {
        id: string;
        nome: string;
    }[];
    constructor(id: string, codigo: number, nome: string, sigla: string, periodo: string, cursos: {
        id: string;
        nome: string;
    }[]);
}
