import axios, { AxiosResponse } from "axios";
import { IApiPokeGen } from "../types/PokemonType";

export const fetchPokemonList = async (
  generation: number,
  page: number,
  pageSize: number
): Promise<IApiPokeGen> => {
  const POKEMON_LIST_API = "/api/pokemon/selection-screen";
  try {
    const response: AxiosResponse<IApiPokeGen> = await axios.get(
      `${POKEMON_LIST_API}?generation=${generation}&` +
        `page=${page}&pageSize=${pageSize}`
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon list.");
  }
};
