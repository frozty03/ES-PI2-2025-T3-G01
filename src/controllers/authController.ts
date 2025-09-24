import type { Request, Response } from "express";
import { AuthService } from "../services/authService.js";

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha)
        return res.status(400).json({ message: "preencha email e senha" })

      const user = await AuthService.login(email, senha)

      req.session.userId = user.id;

      return res.status(200).json({ message: "Login realizado com sucesso", user });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  },
};
