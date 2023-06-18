import express from "express";
import {
  pokemonBattle,
  computerSelectedPokemon,
  userSwitchPokemon,
} from "../controllers/pokemonBattle.js";

const battleRouter = express.Router();

battleRouter.post("/switch-player-pokemon", userSwitchPokemon);

battleRouter.get("/computer-pokemon", computerSelectedPokemon);
battleRouter.get("/:id", pokemonBattle);

export default battleRouter;
