import React, { useState } from "react";
import { PokemonType } from "../../types/PokemonType";
import PokemonCard from "./PokemonCard";
import { useQuery } from "react-query";
import { fetchPokemonList } from "../../util/fetchPokemonList";

const PokemonList: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);

  const {
    data: pokemonList,
    isLoading,
    isError,
    error,
  } = useQuery<PokemonType[], Error>(["pokemonList", offset, limit], () =>
    fetchPokemonList(offset, limit)
  );

  const handlePaginationChange = (newOffset: number, newLimit: number) => {
    if (newOffset >= 0 && newOffset <= 151) {
      setOffset(newOffset);
      setLimit(newLimit);
    }
  };

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
      <div>
        <button onClick={() => handlePaginationChange(offset - limit, limit)}>
          Previous
        </button>
        <button onClick={() => handlePaginationChange(offset + limit, limit)}>
          Next
        </button>
        <select
          value={limit}
          onChange={(e) =>
            handlePaginationChange(offset, parseInt(e.target.value))
          }
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default PokemonList;
