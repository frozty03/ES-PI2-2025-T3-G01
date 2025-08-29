import { db } from "../config/database";
export const UserModel = {
    async findByEmail(email) {
        const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        return rows.length > 0 ? rows[0] : null;
    },
};
//# sourceMappingURL=userModel.js.map