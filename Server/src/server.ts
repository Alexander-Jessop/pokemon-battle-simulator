import express, { Request, Response } from "express";
import pokemonRouter from "./routes/pokemonRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("Send React app here");
});

app.use("/api", pokemonRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
