import axios from "axios";
import { PokemonType } from "../types/PokemonType";

export const fetchPokemonDmg = async (
  move: string,
  playerPokemon: PokemonType,
  compPokemon: PokemonType
) => {
  try {
    const response = await axios.post("/api/battle/attack", {
      move,
      playerPokemon,
      compPokemon,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon damage:", error);
    throw error;
  }
};
