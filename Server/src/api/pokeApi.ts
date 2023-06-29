import axios from "axios";

export const fetchPokemonByGeneration = async (generation: number) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/generation/${generation}`
    );

    return response.data.pokemon_species;
  } catch (error) {
    console.error("Error fetching Pokémon by generation:", error);
    throw error;
  }
};

export const fetchPokemonByNameOrId = async (identifier: string | number) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${identifier}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon by identifier:", error);
    throw error;
  }
};

export const fetchMoveDetails = async (moveUrl: string) => {
  try {
    const response = await axios.get(moveUrl);

    return response.data;
  } catch (error) {
    console.error("Error fetching move details:", error);
    throw error;
  }
};
