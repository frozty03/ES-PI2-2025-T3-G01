import { db } from "./database.js";
async function testarConexao() {
    try {
        const [rows] = await db.query("SELECT 1 + 1 AS resultado");
        console.log("Conexão bem-sucedida! Resultado:", rows);
    }
    catch (err) {
        console.error("Erro ao conectar:", err);
    }
}
testarConexao();
//# sourceMappingURL=testeDb.js.map