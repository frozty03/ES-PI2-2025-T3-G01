export default function authMiddleware(req, res, next) {
    if (!req.session?.userId) {
        return res.status(401).json({ message: "Usuário não autenticado" });
    }
    // injeta o usuário logado no req
    req.user = { id: req.session.userId };
    next();
}
//# sourceMappingURL=authMiddleware.js.map