import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
app.use(express.json());

app.use(express.json());
app.use("/auth", authRoutes);

export default app;

