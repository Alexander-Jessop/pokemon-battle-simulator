import axios from "axios";
import { PokemonType } from "../types/PokemonType";

export const postUserSwitchPokemon = async (
  selectedTeam: PokemonType[],
  index: number
): Promise<void> => {
  const USER_SWITCH_POKEMON_API = "api/battle/switch-player-pokemon";
  try {
    await axios.post(USER_SWITCH_POKEMON_API, {
      selectedTeam,
      index,
    });
    console.log("Pokemon switched successfully");
  } catch (error) {
    console.error("Failed to switch Pokemon:", error);
  }
};
