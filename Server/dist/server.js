import express from "express";
import dotenv from "dotenv";
import sessionConfig from "./dB/session-config.js";
import pokemonRouter from "./routes/pokemonRoutes.js";
import connectToDatabase from "./dB/db-connection.js";
import userRoutes from "./routes/userRoutes.js";
import battleRouter from "./routes/battleRoutes.js";
import * as path from "path";
dotenv.config();
var PORT = process.env.PORT || 8080;
var app = express();
sessionConfig(app);
app.use(express.json());
var clientDistPath = path.resolve(process.cwd(), "../dist/front-end");
app.use(express.static(clientDistPath));
app.use("/api/pokemon", pokemonRouter);
app.use("/api/users", userRoutes);
app.use("/api/battle", battleRouter);
app.get("/", function (_req, res) {
    res.sendFile(path.join(clientDistPath, "index.html"));
});
connectToDatabase();
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
export default app;
