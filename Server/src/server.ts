import express from "express";
import dotenv from "dotenv";
import sessionConfig from "./dB/session-config.js";
import pokemonRouter from "./routes/pokemonRoutes.js";
import connectToDatabase from "./dB/db-connection.js";
import userRoutes from "./routes/userRoutes.js";
import battleRouter from "./routes/battleRoutes.js";
import * as path from "path";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

sessionConfig(app);
app.use(express.json());

const clientDistPath = path.resolve(
  process.cwd(),
  "../../Pokemon-Battle-Simulator/Client/dist"
);

app.use(express.static(clientDistPath));

app.use("/api/pokemon", pokemonRouter);
app.use("/api/users", userRoutes);
app.use("/api/battle", battleRouter);
app.get("/", (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
