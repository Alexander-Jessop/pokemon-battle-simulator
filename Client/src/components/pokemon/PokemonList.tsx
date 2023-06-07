import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchPokemonList } from "../../util/fetchPokemonList";
import PokemonCard from "./PokemonCard";
import { PokemonType } from "../../types/PokemonType";
import { useSelectedTeam } from "../../hooks/useSelectedTeam";
import { usePagination } from "../../hooks/usePagination";

const PokemonList = () => {
  const navigate = useNavigate();
  const { selectedTeam, handleSelectOrRemove, isReadyToBattle } =
    useSelectedTeam();
  const { offset, limit, handlePaginationChange } = usePagination(0, 20, 151);

  const {
    data: pokemonList,
    isLoading,
    isError,
    error,
  } = useQuery<PokemonType[], Error>(["pokemonList", offset, limit], () =>
    fetchPokemonList(offset, limit)
  );

  const handleReadyToBattle = () => {
    navigate("/battle");
  };

  const renderSelectedPokemon = () => (
    <>
      <h2>Selected Pokemon:</h2>
      {selectedTeam.map((pokemon: PokemonType) => (
        <div key={pokemon.id}>
          <PokemonCard
            pokemon={pokemon}
            onSelect={() => handleSelectOrRemove(pokemon)}
            isSelected={true}
          />
        </div>
      ))}
      {isReadyToBattle() && (
        <div>
          <button onClick={handleReadyToBattle}>Ready to Battle</button>
        </div>
      )}
    </>
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
        <h1>Pokemon List</h1>
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
      <div className="flex flex-wrap">{renderSelectedPokemon()}</div>
      {renderPokemonList()}
      {renderPagination()}
    </div>
  );
};

export default PokemonList;
