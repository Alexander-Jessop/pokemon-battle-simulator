import express from "express";
import {
  switchPokemon,
  gameState,
  pokemonAttack,
} from "../controllers/pokemonBattle.js";

const battleRouter = express.Router();

battleRouter.post("/game-state", gameState);

battleRouter.patch("/attack", pokemonAttack);
battleRouter.patch("/switch-player-pokemon", switchPokemon);

export default battleRouter;
