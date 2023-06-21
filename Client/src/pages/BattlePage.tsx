import { useState, useEffect } from "react";
import SelectedBattlePokemon from "../components/pokemon/SelectedBattlePokemon";
import { useSelectedTeam } from "../hooks/useSelectedTeam";
import SwitchMenu from "../components/SwitchMenu";
import { postUserSwitchPokemon } from "../util/postUserSwitchPokemon";
import ErrorScreen from "../components/ErrorScreen";
import { PokemonType } from "../types/PokemonType";
import { fetchPokemonDetails } from "../util/fetchPokemonDetails";
import { fetchComputerSelectedPokemon } from "../util/fetchComputerPokemon";
import AttackButton from "../components/pokemon/PokemonAttack";
import { fetchPokemonDmg } from "../util/fetchPokemonDmg";
import { fetchCompPokeDmg } from "../util/fetchCompPokeDmg";

const BattlePage = () => {
  const { selectedTeam, setSelectedTeam } = useSelectedTeam();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwitchMenuOpen, setSwitchMenuOpen] = useState(false);
  const [computerPokemon, setComputerPokemon] = useState<PokemonType[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<PokemonType | null>(
    selectedTeam.length > 0 ? selectedTeam[currentIndex] : null
  );
  const [error, setError] = useState<string | null>(null);
  const [isComputerPokemonSet, setIsComputerPokemonSet] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLunging, setIsLunging] = useState(false);
  const [isComputerLunging, setIsComputerLunging] = useState(false);

  const [playerPokemonData, setPlayerPokemonData] =
    useState<PokemonType | null>(null);
  const [computerPokemonHP, setComputerPokemonHP] = useState<number | null>(
    null
  );

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

  useEffect(() => {
    const fetchComputerPokemon = async () => {
      try {
        const pokemon = await fetchComputerSelectedPokemon();
        setComputerPokemon(pokemon);
        setIsComputerPokemonSet(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchComputerPokemon();
  }, []);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        if (currentPokemon && isComputerPokemonSet) {
          const playerPokemonId = currentPokemon.id;
          const computerPokemonId = computerPokemon[0].id;

          const pokemonData = await fetchPokemonDetails(
            playerPokemonId,
            computerPokemonId
          );
          setPlayerPokemonData(pokemonData);
          setComputerPokemonHP(pokemonData?.computer?.health);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPokemonData();
  }, [currentPokemon, computerPokemon, isComputerPokemonSet]);

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

      if (playerPokemonData && playerPokemonData.user.health <= 0) {
        updatedTeam[index].isFainted = true;
      }

      setSelectedTeam(updatedTeam);
      setCurrentIndex(index);
      setCurrentPokemon(updatedTeam[index]);
      console.log("updatedTeam[index].id", updatedTeam[index].id);
      console.log("computerPokemon", computerPokemon);

      setTimeout(async () => {
        const { damage: compDamage } = await fetchCompPokeDmg(
          updatedTeam[index].id,
          computerPokemon[0].id
        );

        setIsComputerLunging(true);
        setTimeout(() => {
          setIsComputerLunging(false);
        }, 500);

        setPlayerPokemonData((prevData) => {
          if (prevData) {
            const updatedData = { ...prevData };
            updatedData.user.health -= compDamage;

            if (updatedData.user.health <= 0) {
              setTimeout(() => {
                openSwitchMenu();
              }, 500);
            }

            return updatedData;
          }
          return prevData;
        });
      }, 700);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleMoveClick = async (
    move: string,
    currentPokemonId: number,
    computerPokemonId: number
  ) => {
    try {
      const { damage } = await fetchPokemonDmg(
        move,
        currentPokemonId,
        computerPokemonId
      );

      setComputerPokemonHP((prevHP) =>
        prevHP !== null ? prevHP - damage : null
      );

      setIsLunging(true);
      setTimeout(() => {
        setIsLunging(false);
      }, 500);

      if (computerPokemonHP !== null && computerPokemonHP - damage <= 0) {
        // Computer's Pokémon fainted, switch to the next Pokémon
        const nextComputerPokemon = computerPokemon.slice(1);
        if (nextComputerPokemon.length > 0) {
          setComputerPokemon(nextComputerPokemon);
          setComputerPokemonHP(nextComputerPokemon[0]?.health);
        } else {
          // No more Pokémon left, battle ends
          setTimeout(() => {
            alert("Congratulations! You win!");
            // Handle battle end logic here (e.g., navigate to a victory screen)
          }, 500);
        }
      } else {
        // Computer attacks
        const { damage: compDamage } = await fetchCompPokeDmg(
          currentPokemonId,
          computerPokemonId
        );

        setPlayerPokemonData((prevData) => {
          if (prevData) {
            const updatedData = { ...prevData };
            updatedData.user.health -= compDamage;

            if (updatedData.user.health <= 0) {
              setTimeout(() => {
                openSwitchMenu();
              }, 500);
            }

            return updatedData;
          }
          return prevData;
        });

        setIsComputerLunging(true);
        setTimeout(() => {
          setIsComputerLunging(false);
        }, 500);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-300">
      <div className="mt-60 flex w-full flex-col items-center">
        <div className="w-1/3 min-w-[40rem]">
          <div
            className="relative h-96 overflow-hidden rounded-lg border
            border-gray-500 p-4 shadow-inner"
          >
            {currentPokemon && (
              <div className="absolute bottom-4 left-4 animate-slide-in">
                <SelectedBattlePokemon
                  pokemon={currentPokemon}
                  hp={playerPokemonData?.user?.health}
                  isLunging={isLunging}
                />
              </div>
            )}
            {error && (
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2
              -translate-y-1/2"
              >
                <ErrorScreen error={error} />
              </div>
            )}
            {computerPokemon.length > 0 && (
              <div
                className={`absolute right-4 top-4 ${
                  isLoaded ? "animate-slide-in" : ""
                }`}
              >
                <SelectedBattlePokemon
                  key={computerPokemon[0].id}
                  pokemon={computerPokemon[0]}
                  isComputer={true}
                  hp={computerPokemonHP}
                  isLunging={isComputerLunging}
                />
              </div>
            )}
          </div>
          <div className="mt-4 w-96">
            <div className="grid grid-cols-2 gap-4">
              {playerPokemonData &&
                playerPokemonData.user.moves
                  .slice(0, 4)
                  .map((move: string) => (
                    <AttackButton
                      key={move.name}
                      move={move.name}
                      onClick={() =>
                        handleMoveClick(
                          move.url,
                          selectedTeam[currentIndex].id,
                          computerPokemon[0].id
                        )
                      }
                    />
                  ))}
            </div>
            <div className="mt-2 flex">
              {selectedTeam.length > 1 && (
                <button
                  onClick={openSwitchMenu}
                  className="w-full rounded bg-secondary-500 px-2 py-1 text-white
                  hover:bg-secondary-600"
                >
                  Switch Pokemon
                </button>
              )}
            </div>
          </div>
        </div>
        {isSwitchMenuOpen && (
          <SwitchMenu
            selectedTeam={selectedTeam}
            switchPokemon={switchPokemon}
            closeSwitchMenu={closeSwitchMenu}
          />
        )}
      </div>
    </div>
  );
};

export default BattlePage;
