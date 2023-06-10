import { useQuery } from "react-query";
import { fetchPokemonList } from "../../util/fetchPokemonList";
import PokemonCard from "./PokemonCard";
import { PokemonType } from "../../types/PokemonType";
import { useSelectedTeam } from "../../hooks/useSelectedTeam";
import { usePagination } from "../../hooks/usePagination";

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

  const renderPokemonList = () => {
    const filteredPokemonList = pokemonList
      ?.filter(
        (pokemon: PokemonType) =>
          !selectedTeam.some(
            (selectedPokemon: PokemonType) => selectedPokemon.id === pokemon.id
          )
      )
      ?.slice(0, limit);

    return (
      <>
        <h1 className="mb-5 mt-10 text-center text-4xl font-bold">
          Choose your Pokemon Team
        </h1>
        <div className="m-10 flex flex-wrap justify-center">
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
      </>
    );
  };

  const renderPagination = () => (
    <div className="mt-5 flex items-center justify-center space-x-2">
      <span>Show:</span>
      <select
        value={limit}
        onChange={(e) => handlePaginationChange(offset, +e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-2 py-1"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <button
        onClick={() => handlePaginationChange(offset - limit, limit)}
        className={`rounded-l-lg border border-gray-300 bg-white px-3 py-2
          leading-tight text-secondary-800 hover:bg-gray-100
          hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800
          dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePaginationChange(index * limit, limit)}
          className={`border border-gray-300 bg-white px-3 py-2 leading-tight
        text-secondary-800 hover:bg-gray-100 hover:text-gray-700
        dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400
        dark:hover:bg-gray-700 dark:hover:text-white ${
          currentPage === index + 1 ? "bg-primary-100 text-primary-50" : ""
        }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => handlePaginationChange(offset + limit, limit)}
        className={`rounded-r-lg border border-gray-300 bg-white px-3 py-2
          leading-tight text-secondary-800 hover:bg-gray-100
          hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800
          dark:text-gray-400 dark:hover:bg-gray-700 
           dark:hover:text-white
          `}
      >
        Next
      </button>
    </div>
  );

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
      {renderPokemonList()}
      <div className="mb-10">{renderPagination()}</div>
    </div>
  );
};

export default PokemonList;
