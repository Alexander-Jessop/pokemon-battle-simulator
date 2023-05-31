import express, { Request, Response } from "express";
import dotenv from "dotenv";

import pokemonRouter from "./routes/pokemonRoutes.js";
import connectToDatabase from "./dB/db-connection.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Send React app here");
});

app.use("/api", pokemonRouter);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
