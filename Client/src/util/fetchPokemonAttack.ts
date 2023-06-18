import axios, { AxiosResponse } from "axios";

interface PokemonAttackData {
  sprites: string;
  types: string[];
  moves: { name: string; url: string }[];
}

export const fetchPokemonAttack = async (
  pokemonId: number
): Promise<PokemonAttackData> => {
  const POKEMON_BATTLE_API = "api/pokemon-list/";
  try {
    const url = POKEMON_BATTLE_API + pokemonId;
    const response: AxiosResponse<PokemonAttackData> = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon attack.");
  }
};
