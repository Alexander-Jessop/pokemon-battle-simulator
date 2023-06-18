import axios, { AxiosResponse } from "axios";
import { PokemonType } from "../types/PokemonType";

export const fetchComputerPokemon = async (): Promise<PokemonType> => {
  const COMPUTER_SELECTED_POKEMON_API = "api/battle/computer-pokemon";
  try {
    const response: AxiosResponse<PokemonType> = await axios.get(
      COMPUTER_SELECTED_POKEMON_API
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon list.");
  }
};
