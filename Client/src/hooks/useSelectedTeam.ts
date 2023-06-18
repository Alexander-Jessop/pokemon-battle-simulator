import { useContext } from "react";
import { SelectedTeamContext } from "../context/SelectedTeamContext";
import { PokemonType } from "../types/PokemonType";

export const useSelectedTeam = () => {
  const { selectedTeam, setSelectedTeam } = useContext(SelectedTeamContext);
  const maxSelectedPokemon = 6;

  const handlePokemonSelect = (pokemon: PokemonType) => {
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
      if (selectedTeam.length < maxSelectedPokemon) {
        handlePokemonSelect(pokemon);
      }
    }
  };

  const isReadyToBattle = () => {
    return selectedTeam.length === maxSelectedPokemon;
  };

  return {
    selectedTeam,
    setSelectedTeam,
    handleSelectOrRemove,
    isReadyToBattle,
  };
};
