import type { Instituicao } from "../models/instituicaoModel.js";
export declare const criarInstituicao: (instituicao: Instituicao) => Promise<{
    id?: number;
    nome: string;
    curso: string;
    usuario_id: number;
    inst_id: any;
}>;
//# sourceMappingURL=instituicaoService.d.ts.map