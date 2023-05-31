import axios, { AxiosResponse } from "axios";
import { PokemonType } from "../types/PokemonType";

const POKEMON_LIST_API: string = import.meta.env.VITE_POKEMON_LIST_API;

export const fetchPokemonList = async (
  offset: number,
  limit: number
): Promise<PokemonType[]> => {
  try {
    const response: AxiosResponse<PokemonType[]> = await axios.get(
      `${POKEMON_LIST_API}?offset=${offset}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon list.");
  }
};
