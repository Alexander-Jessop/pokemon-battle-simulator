import axios, { AxiosResponse } from "axios";

const POKEMON_BATTLE_API: string = import.meta.env.VITE_POKEMON_BATTLEING_API;

interface PokemonAttackData {
  sprites: string;
  types: string[];
  moves: { name: string; url: string }[];
}

export const fetchPokemonAttack = async (
  pokemonId: number
): Promise<PokemonAttackData> => {
  try {
    const url = `${POKEMON_BATTLE_API}${pokemonId}`;
    const response: AxiosResponse<PokemonAttackData> = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon attack.");
  }
};
