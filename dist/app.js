import express from "express";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "front-end")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "front-end", "./html/login.html"));
});
app.use("/auth", authRoutes);
export default app;
//# sourceMappingURL=app.js.map