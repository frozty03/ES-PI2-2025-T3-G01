import { db } from "../config/database.js";
export const criarInstituicao = async (instituicao) => {
    const query = "INSERT INTO instituicoes (nome, curso, usuario_id) VALUES (?, ?, ?)";
    const [result] = await db.execute(query, [instituicao.nome, instituicao.curso, instituicao.usuario_id]);
    return { inst_id: result.insertId, ...instituicao };
};
//# sourceMappingURL=instituicaoService.js.map