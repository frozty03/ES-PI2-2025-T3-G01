import express from "express";
import session from "express-session";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import { fileURLToPath } from "url";
import instituicaoRoutes from "./routes/instituicaoRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());

app.use(
  session({
    secret: "sua_chave_secreta", // troque para algo seguro
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // 1h
  })
);

app.use(express.static(path.join(__dirname, "..", "front-end")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "front-end", "./html/login.html"));
});

app.use("/api", instituicaoRoutes)

app.use("/auth", authRoutes);

export default app;

