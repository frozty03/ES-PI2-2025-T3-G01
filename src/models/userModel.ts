import { db } from "../config/database.js";

export interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  senha: string;
}

export const UserModel = {
  async findByEmail(email: string): Promise<User | null> {
    const [rows]: any = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    return rows.length > 0 ? rows[0] : null;
  },
};
