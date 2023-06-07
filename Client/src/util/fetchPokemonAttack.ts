import axios from "axios";

export const fetchPokemonAttack = async (pokemonId: number): Promise<any> => {
  const url = `${import.meta.env.VITE_POKEMON_BATTLEING_API}${pokemonId}`;

  return await axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching Pokemon data:", error);
    });
};
