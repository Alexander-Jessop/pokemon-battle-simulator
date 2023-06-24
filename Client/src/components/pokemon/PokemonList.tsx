import { useQuery, useQueryClient } from "react-query";
import { fetchPokemonList } from "../../util/fetchPokemonList";
import PokemonCard from "./PokemonCard";
import { PokemonType, IApiPokeGen } from "../../types/PokemonType";
import { useSelectedTeam } from "../../hooks/useSelectedTeam";
import { usePagination } from "../../hooks/usePagination";
import LoadingScreen from "../LoadingScreen";
import ErrorScreen from "../ErrorScreen";
import ListPagination from "./ListPagination";

const PokemonList = () => {
  const queryClient = useQueryClient();
  const { selectedTeam, handleSelectOrRemove } = useSelectedTeam();
  const {
    currentPage,
    currentLimit,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination(1, 10, 151, fetchData);

  async function fetchData(page: number, limit: number) {
    await queryClient.prefetchQuery(["pokemonList", page, limit], () =>
      fetchPokemonList(1, page, limit)
    );
  }

  const {
    data: pokemonData,
    isLoading,
    isError,
    error,
  } = useQuery<IApiPokeGen, Error>(
    ["pokemonList", currentPage, currentLimit],
    () => fetchPokemonList(1, currentPage, currentLimit)
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

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mt-5 text-center text-4xl font-bold">
          Choose your Pokemon
        </h1>
        <div className="m-10 flex max-w-8xl flex-wrap justify-center">
          {pokemonList.map((pokemon: PokemonType) => (
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
          limit={currentLimit}
          totalPages={pagination.totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          handleItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default PokemonList;
