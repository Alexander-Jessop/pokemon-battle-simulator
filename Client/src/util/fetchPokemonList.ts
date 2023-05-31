import axios, { AxiosResponse } from "axios";
import { PokemonType } from "../types/PokemonType";

const POKEMON_LIST_API = import.meta.env.VITE_POKEMON_LIST_API as string;

export const fetchPokemonList = async (): Promise<PokemonType[]> => {
  try {
    const response: AxiosResponse<PokemonType[]> = await axios.get(
      POKEMON_LIST_API
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon list.");
  }
};
