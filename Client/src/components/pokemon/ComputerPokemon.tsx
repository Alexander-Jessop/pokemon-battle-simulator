import React from "react";
import { fetchComputerPokemon } from "../../util/fetchRandomPokemon";
import { useQuery } from "react-query";

const ComputerPokemon = () => {
  const {
    data: randomPokemon,
    isLoading,
    error,
  } = useQuery<PokemonType[], Error>("pokemonList", () =>
    fetchComputerPokemon()
  );

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {randomPokemon && (
        <div>
          {randomPokemon.map((pokemon) => (
            <img
              key={pokemon.id}
              src={pokemon.sprite}
              alt={pokemon.name}
              style={{ width: "100px", height: "100px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComputerPokemon;
