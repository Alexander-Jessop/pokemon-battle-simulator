import express from "express";
import dotenv from "dotenv";
import sessionConfig from "./dB/session-config.js";
import pokemonRouter from "./routes/pokemonRoutes.js";
import connectToDatabase from "./dB/db-connection.js";
import userRoutes from "./routes/userRoutes.js";
import battleRouter from "./routes/battleRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Send React app here");
});

sessionConfig(app);

app.use("/api/users", userRoutes);
app.use("/api/battle", battleRouter);
app.use("/api", pokemonRouter);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
