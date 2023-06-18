import axios, { AxiosResponse } from "axios";
import { PokemonType } from "../types/PokemonType";

export const fetchPokemonList = async (
  offset: number,
  limit: number
): Promise<PokemonType[]> => {
  const POKEMON_LIST_API = "api/pokemon-list";
  try {
    const response: AxiosResponse<PokemonType[]> = await axios.get(
      `${POKEMON_LIST_API}?offset=${offset}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon list.");
  }
};
