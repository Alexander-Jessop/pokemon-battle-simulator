import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchPokemonList } from "../../util/fetchPokemonList";
import PokemonCard from "./PokemonCard";
import { PokemonType } from "../../types/PokemonType";

const PokemonList: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<PokemonType[]>([]);
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
      if (newLimit < limit) {
        const selectedPokemonIds = new Set(
          selectedTeam.map((pokemon) => pokemon.id)
        );
        setSelectedTeam((prevSelectedTeam) =>
          prevSelectedTeam.filter((selectedPokemon) =>
            selectedPokemonIds.has(selectedPokemon.id)
          )
        );
      }
      setLimit(newLimit);
    }
  };

  const handlePokemonSelect = (pokemon: PokemonType) => {
    if (selectedTeam.length < 6) {
      setSelectedTeam((prevSelectedTeam) => [...prevSelectedTeam, pokemon]);
    }
  };

  const handleRemoveFromSelectedTeam = (pokemon: PokemonType) => {
    setSelectedTeam((prevSelectedTeam) =>
      prevSelectedTeam.filter(
        (selectedPokemon) => selectedPokemon.id !== pokemon.id
      )
    );
  };

  const handleSelectOrRemove = (pokemon: PokemonType) => {
    if (
      selectedTeam.some((selectedPokemon) => selectedPokemon.id === pokemon.id)
    ) {
      handleRemoveFromSelectedTeam(pokemon);
    } else {
      if (selectedTeam.length < 6) {
        handlePokemonSelect(pokemon);
      }
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

  const filteredPokemonList = pokemonList
    ?.filter(
      (pokemon) =>
        !selectedTeam.some(
          (selectedPokemon) => selectedPokemon.id === pokemon.id
        )
    )
    ?.slice(0, limit);

  return (
    <div>
      <div className="flex flex-wrap">
        <h2>Selected Pokemon:</h2>
        {selectedTeam.map((pokemon) => (
          <div key={pokemon.id}>
            <PokemonCard
              pokemon={pokemon}
              onSelect={() => handleSelectOrRemove(pokemon)}
              isSelected={true}
            />
          </div>
        ))}
      </div>
      <h1>Pokemon List</h1>
      <div className="m-10 flex flex-wrap justify-center">
        {filteredPokemonList?.map((pokemon) => (
          <PokemonCard
            pokemon={pokemon}
            key={pokemon.id}
            onSelect={() => handleSelectOrRemove(pokemon)}
            isSelected={selectedTeam.some(
              (selectedPokemon) => selectedPokemon.id === pokemon.id
            )}
          />
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
            handlePaginationChange(offset, +e.target.value as number)
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
