import { useQuery } from "react-query";

import { fetchPokemonList } from "../../util/fetchPokemonList";
import PokemonCard from "./PokemonCard";
import { PokemonType } from "../../types/PokemonType";
import { useSelectedTeam } from "../../hooks/useSelectedTeam";
import { usePagination } from "../../hooks/usePagination";
import LoadingScreen from "../LoadingScreen";
import ErrorScreen from "../ErrorScreen";
import ListPagination from "./ListPagination";

const PokemonList = () => {
  const { selectedTeam, handleSelectOrRemove } = useSelectedTeam();
  const { offset, limit, totalPages, currentPage, handlePaginationChange } =
    usePagination(0, 10, 151, 151);

  const {
    data: pokemonList,
    isLoading,
    isError,
    error,
  } = useQuery<PokemonType[], Error>(["pokemonList", offset, limit], () =>
    fetchPokemonList(offset, limit)
  );

  const filteredPokemonList = pokemonList
    ?.filter(
      (pokemon: PokemonType) =>
        !selectedTeam.some(
          (selectedPokemon: PokemonType) => selectedPokemon.id === pokemon.id
        )
    )
    ?.slice(0, limit);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen message={error.toString()} />;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-5 mt-10 text-center text-4xl font-bold">
          Choose your Pokemon
        </h1>
        <div className="m-10 flex max-w-8xl flex-wrap justify-center">
          {filteredPokemonList?.map((pokemon: PokemonType) => (
            <PokemonCard
              pokemon={pokemon}
              key={pokemon.id}
              onSelect={() => handleSelectOrRemove(pokemon)}
              isSelected={selectedTeam.some(
                (selectedPokemon: PokemonType) =>
                  selectedPokemon.id === pokemon.id
              )}
            />
          ))}
        </div>
      </div>
      <div className="mb-10">
        <ListPagination
          limit={limit}
          offset={offset}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default PokemonList;
