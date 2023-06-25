import express from "express";
import {
  getPokemon,
  getPokemonByGeneration,
} from "../controllers/pokemonController.js";

const pokemonRouter = express.Router();

pokemonRouter.get("/selection-screen", getPokemonByGeneration);

pokemonRouter.post("/pokemon-data", getPokemon);

export default pokemonRouter;
