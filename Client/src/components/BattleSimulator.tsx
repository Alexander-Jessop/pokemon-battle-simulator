import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { fetchPokemonList } from "../util/fetchPokemonList";
import { PokemonType } from "../types/PokemonType";
import { SelectedTeamContext } from "../context/SelectedTeamContext";

const BattleSimulator = () => {
  const MAX_POKEMON_HP = 100;
  const { isLoading, error, data } = useQuery<PokemonType[], Error>(
    ["pokemonList"],
    () => fetchPokemonList(0, 151)
  );
  const [computerPokemon, setComputerPokemon] = useState<PokemonType[]>([]);
  const [releasedPokemon, setReleasedPokemon] = useState<number[]>([]);
  const { selectedTeam, setSelectedTeam } = useContext(SelectedTeamContext);
  const [pokemonData, setPokemonData] = useState<any>();
  const [computerPokemonData, setComputerPokemonData] = useState<any>();
  const [computerPokemonHP, setComputerPokemonHP] =
    useState<number>(MAX_POKEMON_HP);
  const [playerPokemonHP, setPlayerPokemonHP] =
    useState<number>(MAX_POKEMON_HP);
  const [isSwitchMenuOpen, setSwitchMenuOpen] = useState(false);

  const selectRandomPokemon = (pokemonList: PokemonType[]) => {
    const randomPokemon: PokemonType[] = [];
    while (randomPokemon.length < 6) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const randomPokemonData = pokemonList[randomIndex];
      if (!randomPokemon.includes(randomPokemonData)) {
        randomPokemon.push(randomPokemonData);
      }
    }
    return randomPokemon;
  };

  useEffect(() => {
    if (data) {
      const randomPokemon = selectRandomPokemon(data);
      setComputerPokemon(randomPokemon);
      setReleasedPokemon([0]);
    }
  }, [data]);

  const releasePokemon = (index: number) => {
    if (!releasedPokemon.includes(index)) {
      setReleasedPokemon((prevReleasedPokemon) => [
        ...prevReleasedPokemon,
        index,
      ]);
    }
  };

  const switchPokemon = (index: number, isPlayer: boolean) => {
    if (isPlayer) {
      const selectedPokemon = selectedTeam[0];
      const reservedPokemon = selectedTeam[index];
      const updatedTeam = [...selectedTeam];
      updatedTeam[0] = reservedPokemon;
      updatedTeam[index] = selectedPokemon;
      setSelectedTeam(updatedTeam);
    } else {
      const selectedPokemon = computerPokemon[0];
      const reservedPokemon = computerPokemon[index];
      const updatedTeam = [...computerPokemon];
      updatedTeam[0] = reservedPokemon;
      updatedTeam[index] = selectedPokemon;
      setComputerPokemon(updatedTeam);
    }
  };

  useEffect(() => {
    if (selectedTeam.length > 0) {
      axios
        .get(
          `${import.meta.env.VITE_POKEMON_BATTLEING_API}${selectedTeam[0].id}`
        )
        .then((response) => {
          setPokemonData(response.data);
        })
        .catch((error) => {
          throw new Error("Error fetching Pokemon data:", error);
        });
    }
  }, [selectedTeam]);

  useEffect(() => {
    if (computerPokemon.length > 0) {
      axios
        .get(
          `${import.meta.env.VITE_POKEMON_BATTLEING_API}${
            computerPokemon[0].id
          }`
        )
        .then((response) => {
          setComputerPokemonData(response.data);
        })
        .catch((error) => {
          throw new Error("Error fetching computer's Pokemon data:", error);
        });
    }
  }, [computerPokemon]);

  const calculateDamage = (power: number | null) => {
    if (power === null) {
      return 0;
    }

    const randomMultiplier = Math.random() * (1.5 - 0.5) + 0.5;
    const calculatedDamage = Math.round(power * randomMultiplier);

    return calculatedDamage;
  };

  const handleAttack = async (moveUrl: string, isPlayer: boolean) => {
    try {
      const response = await axios.get(moveUrl);
      const moveData = response.data;
      const damage = calculateDamage(moveData.power);

      if (isPlayer) {
        setComputerPokemonHP((prevHP) => {
          const newHP = prevHP - damage;
          if (newHP <= 0) {
            setComputerPokemonHP(MAX_POKEMON_HP);
            setComputerPokemon((prevPokemon) => prevPokemon.slice(1));
          }
          return newHP;
        });
      } else {
        setPlayerPokemonHP((prevHP) => {
          const newHP = prevHP - damage;
          if (newHP <= 0) {
            if (selectedTeam.length > 1) {
              setSelectedTeam((prevTeam) => prevTeam.slice(1));
              setPlayerPokemonHP(MAX_POKEMON_HP);
            } else {
              setSelectedTeam([]);
              setPlayerPokemonHP(0);
            }
          }
          return newHP;
        });
      }
    } catch (error) {
      throw new Error("Error fetching move data:", error);
    }

    if (isPlayer) {
      handleComputerTurn();
    }
  };

  const handleComputerTurn = async () => {
    const randomMoveIndex = Math.floor(
      Math.random() * computerPokemonData.moves.length
    );
    const randomMove = computerPokemonData.moves[randomMoveIndex];
    const moveUrl = randomMove.url;

    try {
      const response = await axios.get(moveUrl);
      const moveData = response.data;
      const damage = calculateDamage(moveData.power);

      setPlayerPokemonHP((prevHP) => prevHP - damage);
    } catch (error) {
      throw new Error("Error fetching move data:", error);
    }
  };

  const openSwitchMenu = () => {
    setSwitchMenuOpen(true);
  };

  const closeSwitchMenu = () => {
    setSwitchMenuOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex h-screen items-center justify-center bg-gray-300">
      <div>
        <div className="rounded-lg border border-gray-500 p-4 shadow-inner">
          <div className="flex flex-col-reverse justify-between md:flex-row">
            <div className="mr-28 mt-28 md:order-1 md:mb-0">
              {selectedTeam.length > 0 && pokemonData && (
                <div className="relative">
                  <img
                    src={pokemonData.sprites}
                    alt="Pokemon Sprite"
                    className="h-64 w-64"
                  />
                  <h2 className="text-lg font-bold capitalize">
                    {selectedTeam[0].name}
                  </h2>
                  <p>HP: {playerPokemonHP}</p>
                </div>
              )}
              {selectedTeam.length === 0 && (
                <div>
                  <p>None</p>
                </div>
              )}
            </div>
            <div className="ml-28 md:order-2">
              <h2 className="text-lg font-bold capitalize">
                {computerPokemon.length > 0 && computerPokemon[0].name}
              </h2>
              <p>HP: {computerPokemonHP}</p>
              {computerPokemon.length > 0 && computerPokemonData && (
                <div className="relative">
                  <img
                    src={computerPokemonData.sprites}
                    alt="Pokemon Sprite"
                    className="h-48 w-48"
                  />
                </div>
              )}

              {computerPokemon.length === 0 && (
                <div>
                  <p>None</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex">
          {selectedTeam.length > 0 && pokemonData && (
            <div className="mt-4">
              <h3 className="text-sm font-bold">Moves:</h3>
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col">
                  {pokemonData.moves.slice(0, 2).map((move: any) => (
                    <button
                      key={move.name}
                      onClick={() => handleAttack(move.url, true)}
                      className="mb-2 rounded bg-primary-500
                        px-2 py-1 text-white hover:bg-primary-600"
                    >
                      {move.name}
                    </button>
                  ))}
                </div>
                <div className="ml-4 flex flex-col">
                  {pokemonData.moves.slice(2, 4).map((move: any) => (
                    <button
                      key={move.name}
                      onClick={() => handleAttack(move.url, true)}
                      className="mb-2 rounded bg-primary-500 px-2
                        py-1 text-white hover:bg-primary-600"
                    >
                      {move.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {selectedTeam.length > 1 && (
            <div className="mt-4">
              <h2 className="ml-6 text-sm font-bold">Reserved Pokemon:</h2>

              <button
                onClick={openSwitchMenu}
                className="ml-6 rounded bg-secondary-500 px-2
                  py-1 text-white hover:bg-secondary-600"
              >
                Switch Pokemon
              </button>
            </div>
          )}
        </div>

        {isSwitchMenuOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/3 rounded-lg bg-white p-4 shadow-lg">
              <h2 className="mb-4 text-lg font-bold">Pokemon:</h2>
              <ul>
                {selectedTeam.slice(1).map((pokemon, index) => (
                  <li
                    key={pokemon.id}
                    className="flex items-center justify-between border-b border-gray-200 py-2"
                  >
                    <span>{pokemon.name}</span>
                    <button
                      onClick={() => {
                        switchPokemon(index + 1, true);
                        closeSwitchMenu();
                      }}
                      className="ml-2 rounded bg-secondary-500 px-4 py-2 text-white hover:bg-secondary-600"
                    >
                      Switch
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={closeSwitchMenu}
                className="mt-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleSimulator;
