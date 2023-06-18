import { useState, useEffect } from "react";
import SelectedBattlePokemon from "../components/pokemon/SelectedBattlePokemon";
import { useSelectedTeam } from "../hooks/useSelectedTeam";
import SwitchMenu from "../components/SwitchMenu";
import { postUserSwitchPokemon } from "../util/postUserSwitchPokemon";
import ErrorScreen from "../components/ErrorScreen";
import { PokemonType } from "../types/PokemonType";

const BattlePage = () => {
  const { selectedTeam, setSelectedTeam } = useSelectedTeam();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwitchMenuOpen, setSwitchMenuOpen] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState<PokemonType | null>(
    selectedTeam.length > 0 ? selectedTeam[currentIndex] : null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTeam.length > 0) {
      setCurrentPokemon(selectedTeam[currentIndex]);
    }
  }, [selectedTeam, currentIndex]);

  useEffect(() => {
    const allPokemonInBattle = selectedTeam.every(
      (pokemon) => pokemon.isInBattle === false
    );

    if (allPokemonInBattle && selectedTeam.length > 0) {
      const updatedTeam = [...selectedTeam];
      updatedTeam[0] = { ...updatedTeam[0], isInBattle: true };
      setSelectedTeam(updatedTeam);
      setCurrentPokemon(updatedTeam[currentIndex]);
    }
  }, [selectedTeam]);

  const openSwitchMenu = () => {
    setSwitchMenuOpen(true);
  };

  const closeSwitchMenu = () => {
    setSwitchMenuOpen(false);
  };

  const switchPokemon = async (index: number) => {
    try {
      await postUserSwitchPokemon(selectedTeam, index);

      const updatedTeam = [...selectedTeam];
      updatedTeam[currentIndex].isInBattle = false;
      updatedTeam[index].isInBattle = true;
      setSelectedTeam(updatedTeam);
      setCurrentIndex(index); // Update the currentIndex
      setCurrentPokemon(updatedTeam[index]);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-300">
      <div className="rounded-lg border border-gray-500 p-4 shadow-inner">
        <div className="relative">
          {currentPokemon && (
            <div>
              <h2 className="text-lg font-bold">
                User&apos;s Selected Pokemon:
              </h2>
              <SelectedBattlePokemon pokemon={currentPokemon} />
            </div>
          )}
          {selectedTeam.length > 1 && (
            <div className="absolute bottom-4 left-4">
              <button
                onClick={openSwitchMenu}
                className="rounded bg-secondary-500 px-2 py-1 text-white
                hover:bg-secondary-600"
              >
                Switch Pokemon
              </button>
              {isSwitchMenuOpen && (
                <SwitchMenu
                  selectedTeam={selectedTeam}
                  switchPokemon={switchPokemon}
                  closeSwitchMenu={closeSwitchMenu}
                />
              )}
            </div>
          )}
        </div>
      </div>
      {error && <ErrorScreen message={error} />}
    </div>
  );
};

export default BattlePage;
