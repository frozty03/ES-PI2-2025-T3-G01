import { db } from "../config/database.js";
import type { Instituicao } from "../models/instituicaoModel.js";

export const criarInstituicao = async (instituicao: Instituicao) => {
  const query = "INSERT INTO instituicoes (nome, curso, usuario_id) VALUES (?, ?, ?)";
  const [result]: any = await db.execute(query, [instituicao.nome, instituicao.curso, instituicao.usuario_id]);
  return { inst_id: result.insertId, ...instituicao };
};
