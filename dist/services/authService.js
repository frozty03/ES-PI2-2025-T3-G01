import { UserModel } from "../models/UserModel";
export const AuthService = {
    async login(email, senha) {
        const user = await UserModel.findByEmail(email);
        if (!user)
            throw new Error("Usuario nao encontrado");
        if (senha != user.senha)
            throw new Error("Senha incorreta");
        return user;
    },
};
//# sourceMappingURL=authService.js.map