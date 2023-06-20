import axios from "axios";
import { PokemonType } from "../types/PokemonType";

export const fetchCompPokeDmg = async (
  playerPokemon: PokemonType,
  compPokemon: PokemonType
) => {
  try {
    const response = await axios.post("/api/battle/computer-attack", {
      playerPokemon,
      compPokemon,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon damage:", error);
    throw error;
  }
};
