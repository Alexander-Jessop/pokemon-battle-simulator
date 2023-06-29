import express from "express";
import {
  switchPokemon,
  gameState,
  pokemonAttack,
  getGameState,
  switchComputerPokemon,
  deleteBattle,
} from "../controllers/pokemonBattle.js";

const battleRouter = express.Router();

battleRouter.get("/game-state/:battleId", getGameState);

battleRouter.post("/game-state", gameState);

battleRouter.patch("/attack", pokemonAttack);
battleRouter.patch("/switch-player-pokemon", switchPokemon);
battleRouter.patch("/switch-computer-pokemon", switchComputerPokemon);

battleRouter.delete("/game-state/:battleId", deleteBattle);

export default battleRouter;
