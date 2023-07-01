import { useQuery, useQueryClient } from "react-query";
import { fetchPokemonList } from "../../util/fetchPokemonList";
import PokemonCard from "./PokemonCard";
import { ISelPokeType, IApiPokeGen } from "../../types/PokemonType";
import { useSelectedTeam } from "../../hooks/useSelectedTeam";
import { usePagination } from "../../hooks/usePagination";
import LoadingScreen from "../LoadingScreen";
import ErrorScreen from "../ErrorScreen";
import ListPagination from "./ListPagination";
import { prefetchPokemonList } from "../../util/pokeApi";

const PokemonList = () => {
  const queryClient = useQueryClient();
  const { selectedTeam, handleSelectOrRemove } = useSelectedTeam();
  const {
    currentPage,
    currentLimit,
    currentGeneration,
    handlePageChange,
    handleItemsPerPageChange,
    handleGenerationChange: paginationHandleGenerationChange,
  } = usePagination(1, 10, 151, 1, prefetchData);

  async function prefetchData(page: number, limit: number) {
    await prefetchPokemonList(queryClient, currentGeneration, page, limit);
  }

  const {
    data: pokemonData,
    isLoading,
    isError,
    error,
  } = useQuery<IApiPokeGen, Error>(
    ["pokemonList", currentPage, currentLimit, currentGeneration],
    () => fetchPokemonList(currentGeneration, currentPage, currentLimit)
  );

  const { data: pokemonList, pagination } = pokemonData || {
    data: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
    },
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen message={error.toString()} />;
  }

  const filteredPokemonList = pokemonList
    ? pokemonList.filter(
        (pokemon: ISelPokeType) =>
          !selectedTeam.some(
            (selectedPokemon: ISelPokeType) => selectedPokemon.id === pokemon.id
          )
      )
    : [];

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mt-8 text-center text-4xl font-bold text-primary-400">
          Choose Your Six Pokemon Team
        </h1>
        <div className="m-10 flex max-w-8xl flex-wrap justify-center">
          {filteredPokemonList.map((pokemon: ISelPokeType) => (
            <PokemonCard
              pokemon={pokemon}
              key={pokemon.id}
              onSelect={() => handleSelectOrRemove(pokemon)}
              isSelected={selectedTeam.some(
                (selectedPokemon: ISelPokeType) =>
                  selectedPokemon.id === pokemon.id
              )}
            />
          ))}
        </div>
      </div>
      <div className="mb-10">
        <ListPagination
          limit={currentLimit}
          totalPages={pagination.totalPages}
          currentPage={currentPage}
          currentGeneration={currentGeneration}
          handlePageChange={handlePageChange}
          handleItemsPerPageChange={handleItemsPerPageChange}
          handleGenerationChange={paginationHandleGenerationChange}
        />
      </div>
    </div>
  );
};

export default PokemonList;
