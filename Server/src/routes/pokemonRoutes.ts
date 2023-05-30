import express from "express";
import { getPokemon } from "../controllers/pokemonController.js";

const pokemonRouter = express.Router();

pokemonRouter.get("/pokemon-list", getPokemon);

export default pokemonRouter;
