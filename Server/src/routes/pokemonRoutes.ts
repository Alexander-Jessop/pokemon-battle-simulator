import express from "express";
import { getPokemon } from "../controllers/pokemonController.js";
import { pokemonBattle } from "../controllers/pokemonBattle.js";

const pokemonRouter = express.Router();

pokemonRouter.get("/pokemon-list/:id", pokemonBattle);
pokemonRouter.get("/pokemon-list", getPokemon);

export default pokemonRouter;
