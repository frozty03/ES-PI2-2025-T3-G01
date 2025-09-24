import type { Request, Response, NextFunction } from "express";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  // injeta o usuário logado no req
  req.user = { id: req.session.userId };
  next();
}
