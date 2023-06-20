import axios, { AxiosResponse } from "axios";

interface PokemonDetailsData {
  sprites: string;
  types: string[];
  moves: { name: string; url: string }[];
}

export const fetchPokemonDetails = async (
  playerPokemonId: number,
  compPokeId: number
): Promise<PokemonDetailsData> => {
  const POKEMON_BATTLE_API = "api/battle/";
  try {
    const url = POKEMON_BATTLE_API + playerPokemonId + "/" + compPokeId;
    const response: AxiosResponse<PokemonDetailsData> = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon details.");
  }
};
