import { criarInstituicao } from "../services/instituicaoService.js";
export const cadastrarInstituicao = async (req, res) => {
    try {
        const { nome, curso, usuario_id } = req.body;
        if (!nome || !curso || !usuario_id) {
            return res.status(400).json({ message: "Nome, curso e usuario_id são obrigatórios" });
        }
        const novaInstituicao = await criarInstituicao({ nome, curso, usuario_id });
        return res.status(201).json({
            message: "Instituição cadastrada com sucesso",
            instituicao: novaInstituicao,
        });
    }
    catch (error) {
        console.error("Erro ao cadastrar instituição:", error);
        return res.status(500).json({ message: "Erro no servidor" });
    }
};
//# sourceMappingURL=instituicaoController.js.map