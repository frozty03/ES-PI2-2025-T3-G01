export class ListarDisciplinaDTO {
    constructor(
        readonly id: string,
        readonly codigo: number,
        readonly nome: string,
        readonly sigla: string,
        readonly periodo: string,
        readonly cursos: { id: string, nome: string }[] // listar o id e o nome do array de cursos
    ) {}
}