import { IPokePlayer } from "../types/pokeTypes.js";
import { fetchPokemonByNameOrId } from "../api/pokeApi.js";

const generatePokemonData = async (pokemonList: (IPokePlayer | number)[]) => {
  const pokemonPromises = pokemonList.map(
    async (pokemon: IPokePlayer | number) => {
      let pokemonData;

      typeof pokemon === "object"
        ? (pokemonData = await fetchPokemonByNameOrId(pokemon.name))
        : (pokemonData = await fetchPokemonByNameOrId(pokemon));

      return {
        ...pokemonData,
        isInBattle: false,
        isFainted: false,
        damage: 0,
      };
    }
  );

  return await Promise.all(pokemonPromises);
};

export default generatePokemonData;
