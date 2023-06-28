import express from "express";
import {
  switchPokemon,
  gameState,
  pokemonAttack,
  getGameState,
  switchComputerPokemon,
} from "../controllers/pokemonBattle.js";

const battleRouter = express.Router();

battleRouter.get("/game-state/:battleId", getGameState);

battleRouter.post("/game-state", gameState);

battleRouter.patch("/attack", pokemonAttack);
battleRouter.patch("/switch-player-pokemon", switchPokemon);
battleRouter.patch("/switch-computer-pokemon", switchComputerPokemon);

export default battleRouter;
