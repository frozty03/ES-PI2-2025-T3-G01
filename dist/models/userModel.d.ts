export interface User {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
}
export declare const UserModel: {
    findByEmail(email: string): Promise<User | null>;
};
//# sourceMappingURL=userModel.d.ts.map