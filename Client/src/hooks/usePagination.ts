import { useState, useContext } from "react";
import { SelectedTeamContext } from "../context/SelectedTeamContext";
import { PokemonType } from "../types/PokemonType";

export function usePagination(
  initialOffset: number,
  initialLimit: number,
  maxOffset: number
) {
  const [offset, setOffset] = useState<number>(initialOffset);
  const [limit, setLimit] = useState<number>(initialLimit);
  const { selectedTeam, setSelectedTeam } = useContext(SelectedTeamContext);

  const handlePaginationChange = (newOffset: number, newLimit: number) => {
    if (newOffset >= 0 && newOffset <= maxOffset) {
      setOffset(newOffset);
      if (newLimit < limit) {
        const selectedPokemonIds = new Set(
          selectedTeam.map((pokemon: PokemonType) => pokemon.id)
        );
        setSelectedTeam((prevSelectedTeam: PokemonType[]) =>
          prevSelectedTeam.filter((selectedPokemon: PokemonType) =>
            selectedPokemonIds.has(selectedPokemon.id)
          )
        );
      }
      setLimit(newLimit);
    }
  };

  return {
    offset,
    limit,
    handlePaginationChange,
  };
}
