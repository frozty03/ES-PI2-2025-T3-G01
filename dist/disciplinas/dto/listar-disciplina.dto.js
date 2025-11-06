"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarDisciplinaDTO = void 0;
class ListarDisciplinaDTO {
    id;
    codigo;
    nome;
    sigla;
    periodo;
    cursos;
    constructor(id, codigo, nome, sigla, periodo, cursos) {
        this.id = id;
        this.codigo = codigo;
        this.nome = nome;
        this.sigla = sigla;
        this.periodo = periodo;
        this.cursos = cursos;
    }
}
exports.ListarDisciplinaDTO = ListarDisciplinaDTO;
//# sourceMappingURL=listar-disciplina.dto.js.map