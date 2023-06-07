import { useContext } from "react";
import { SelectedTeamContext } from "../context/SelectedTeamContext";
import { PokemonType } from "../types/PokemonType";

export function useSelectedTeam() {
  const { selectedTeam, setSelectedTeam } = useContext(SelectedTeamContext);

  const handlePokemonSelect = (pokemon: PokemonType) => {
    const maxSelectedPokemon = 6;
    if (selectedTeam.length < maxSelectedPokemon) {
      setSelectedTeam((prevSelectedTeam: PokemonType[]) => [
        ...prevSelectedTeam,
        pokemon,
      ]);
    }
  };

  const handleRemoveFromSelectedTeam = (pokemon: PokemonType) => {
    setSelectedTeam((prevSelectedTeam: PokemonType[]) =>
      prevSelectedTeam.filter(
        (selectedPokemon: PokemonType) => selectedPokemon.id !== pokemon.id
      )
    );
  };

  const handleSelectOrRemove = (pokemon: PokemonType) => {
    if (
      selectedTeam.some(
        (selectedPokemon: PokemonType) => selectedPokemon.id === pokemon.id
      )
    ) {
      handleRemoveFromSelectedTeam(pokemon);
    } else {
      const maxSelectedPokemon = 6;
      if (selectedTeam.length < maxSelectedPokemon) {
        handlePokemonSelect(pokemon);
      }
    }
  };

  const isReadyToBattle = () => {
    const maxSelectedPokemon = 6;
    return selectedTeam.length === maxSelectedPokemon;
  };

  return {
    selectedTeam,
    handleSelectOrRemove,
    isReadyToBattle,
  };
}
