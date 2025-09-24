import { Router } from "express";
import { cadastrarInstituicao } from "../controllers/instituicaoController.js";

const router = Router();

router.post("/instituicoes", cadastrarInstituicao);

export default router;
