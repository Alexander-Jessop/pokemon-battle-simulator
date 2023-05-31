import React from "react";
import { PokemonType } from "../../types/PokemonType";
import PokemonCard from "./PokemonCard";
import { useQuery } from "react-query";
import { fetchPokemonList } from "../../util/fetchPokemonList";

const PokemonList: React.FC = () => {
  const {
    data: pokemonList,
    isLoading,
    isError,
    error,
  } = useQuery<PokemonType[], Error>("pokemonList", fetchPokemonList);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>Error: {error?.message ?? "Failed to fetch Pokemon list."}</div>
    );
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <div className="m-10 flex flex-wrap justify-center">
        {pokemonList?.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
