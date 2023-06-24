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

export const fetchPokemonByName = async (name: string) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon by name:", error);
    throw error;
  }
};
