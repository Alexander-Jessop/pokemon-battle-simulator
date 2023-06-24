import express from "express";
import {
  getPokemon,
  getPokemonByGeneration,
} from "../controllers/pokemonController.js";
import { pokemonBattle } from "../controllers/pokemonBattle.js";

const pokemonRouter = express.Router();

pokemonRouter.get("/pokemon-list/:id", pokemonBattle);
pokemonRouter.get("/pokemon-list", getPokemon);

pokemonRouter.get("/selection-screen", getPokemonByGeneration);

export default pokemonRouter;
