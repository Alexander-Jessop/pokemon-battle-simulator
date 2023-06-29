import axios from "axios";
import { ISelPokeType } from "../types/PokemonType";

const postGameState = async (selPokeData: ISelPokeType[]) => {
  try {
    const res = await axios.post("/api/battle/game-state", {
      playerPokemon: selPokeData,
    });

    return res.data;
  } catch (err) {
    throw new Error("Failed to post game state");
  }
};

export default postGameState;
