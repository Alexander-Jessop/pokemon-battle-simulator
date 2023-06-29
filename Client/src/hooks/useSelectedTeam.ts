import { useContext } from "react";
import { SelectedTeamContext } from "../context/SelectedTeamContext";
import { ISelPokeType } from "../types/PokemonType";

export const useSelectedTeam = () => {
  const { selectedTeam, setSelectedTeam } = useContext(SelectedTeamContext);
  const maxSelectedPokemon = 6;

  const handlePokemonSelect = (pokemon: ISelPokeType) => {
    if (selectedTeam.length < maxSelectedPokemon) {
      setSelectedTeam((prevSelectedTeam: ISelPokeType[]) => [
        ...prevSelectedTeam,
        pokemon,
      ]);
    }
  };

  const handleRemoveFromSelectedTeam = (pokemon: ISelPokeType) => {
    setSelectedTeam((prevSelectedTeam: ISelPokeType[]) =>
      prevSelectedTeam.filter(
        (selectedPokemon: ISelPokeType) => selectedPokemon.id !== pokemon.id
      )
    );
  };

  const removeAllPokemon = () => {
    setSelectedTeam([]);
  };

  const handleSelectOrRemove = (pokemon: ISelPokeType) => {
    if (
      selectedTeam.some(
        (selectedPokemon: ISelPokeType) => selectedPokemon.id === pokemon.id
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
    removeAllPokemon,
    isReadyToBattle,
  };
};
