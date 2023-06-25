import express from "express";
import {
  pokemonBattle,
  computerSelectedPokemon,
  userSwitchPokemon,
  calculateDamage,
  compDmg,
  gameState,
} from "../controllers/pokemonBattle.js";

const battleRouter = express.Router();

battleRouter.post("/game-state", gameState);

battleRouter.post("/switch-player-pokemon", userSwitchPokemon);
battleRouter.post("/attack", calculateDamage);
battleRouter.post("/computer-attack", compDmg);

battleRouter.get("/computer-pokemon", computerSelectedPokemon);
battleRouter.get("/:playerPokemonId/:computerPokemonId", pokemonBattle);

export default battleRouter;
