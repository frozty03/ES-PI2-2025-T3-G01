import { AuthService } from "../services/authService.js";
export const AuthController = {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha)
                return res.status(400).json({ message: "preencha email e senha" });
            const user = await AuthService.login(email, senha);
            return res.status(200).json({ message: "Login realizado com sucesso", user });
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    },
};
//# sourceMappingURL=authController.js.map