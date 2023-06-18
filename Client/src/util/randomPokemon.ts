import { PokemonType } from "../types/PokemonType";

const randomPokemon = (pokemon: PokemonType[]) => {
  const random = Math.floor(Math.random() * pokemon.length);
  return pokemon[random];
};

export default randomPokemon;
