import express from "express";

const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.get("/", (req, res) => {
  res.send("Hello, Node + TypeScript!");
});

export default app;

