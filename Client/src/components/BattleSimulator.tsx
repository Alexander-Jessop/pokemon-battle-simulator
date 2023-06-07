import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { fetchPokemonList } from "../util/fetchPokemonList";
import { PokemonType } from "../types/PokemonType";
import { SelectedTeamContext } from "../context/SelectedTeamContext";

const BattleSimulator = () => {
  let MAX_POKEMON_HP = 100;
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
          console.error("Error fetching Pokemon data:", error);
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
          console.error("Error fetching computer's Pokemon data:", error);
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

  const handleAttack = (moveUrl: string, isPlayer: boolean) => {
    axios
      .get(moveUrl)
      .then((response) => {
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
                // Switch to the next Pokémon in the reserved team
                setSelectedTeam((prevTeam) => prevTeam.slice(1));
                setPlayerPokemonHP(MAX_POKEMON_HP);
              } else {
                // No more reserved Pokémon, player loses
                setSelectedTeam([]);
                setPlayerPokemonHP(0);
              }
            }
            return newHP;
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching move data:", error);
      });

    if (isPlayer) {
      handleComputerTurn();
    }
  };

  const handleComputerTurn = () => {
    const randomMoveIndex = Math.floor(
      Math.random() * computerPokemonData.moves.length
    );
    const randomMove = computerPokemonData.moves[randomMoveIndex];
    const moveUrl = randomMove.url;

    axios
      .get(moveUrl)
      .then((response) => {
        const moveData = response.data;
        const damage = calculateDamage(moveData.power);

        setPlayerPokemonHP((prevHP) => prevHP - damage);
      })
      .catch((error) => {
        console.error("Error fetching move data:", error);
      });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>
        <h2>Computer&#39;s Pokemon:</h2>
        {computerPokemon.length > 0 ? (
          <div>
            <p>{computerPokemon[0].name}</p>
            {computerPokemonData && (
              <div>
                <p>
                  Sprites:{" "}
                  <img src={computerPokemonData.sprites} alt="Pokemon Sprite" />
                </p>
                <p>
                  Types:{" "}
                  {computerPokemonData.types.map((type: any) => (
                    <span key={type.type.name}>{type.type.name} </span>
                  ))}
                </p>
                <p>
                  Moves:{" "}
                  {computerPokemonData.moves.map((move: any) => (
                    <button
                      key={move.name}
                      onClick={() => handleAttack(move.url, false)}
                    >
                      {move.name}
                    </button>
                  ))}
                </p>
              </div>
            )}
            <p>HP: {computerPokemonHP}</p> {/* Display computer's HP */}
          </div>
        ) : (
          <p>None</p>
        )}
      </div>
      <ul>
        {computerPokemon.map((pokemon, index) => {
          const isReleased = releasedPokemon.includes(index);
          return (
            <li key={pokemon.id}>
              {isReleased ? (
                pokemon.name
              ) : (
                <button onClick={() => releasePokemon(index)}>Release</button>
              )}
              {!isReleased && (
                <button onClick={() => switchPokemon(index, false)}>
                  Switch
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <div>
        <h2>Player&#39;s Pokemon:</h2>
        {selectedTeam.length > 0 ? (
          <div>
            <p>{selectedTeam[0].name}</p>
            {pokemonData && (
              <div>
                <p>
                  Sprites:{" "}
                  <img src={pokemonData.sprites} alt="Pokemon Sprite" />
                </p>
                <p>
                  Types:{" "}
                  {pokemonData.types.map((type: any) => (
                    <span key={type.type.name}>{type.type.name} </span>
                  ))}
                </p>
                <p>
                  Moves:{" "}
                  {pokemonData.moves.map((move: any) => (
                    <button
                      key={move.name}
                      onClick={() => handleAttack(move.url, true)}
                    >
                      {move.name}
                    </button>
                  ))}
                </p>
              </div>
            )}
            <p>HP: {playerPokemonHP}</p>
            <div>
              <h2>Reserved Pokemon:</h2>
              <ul>
                {selectedTeam.slice(1).map((pokemon, index) => (
                  <li key={pokemon.id}>
                    {pokemon.name}
                    <button onClick={() => switchPokemon(index + 1, true)}>
                      Switch
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <h2>Player's Pokemon:</h2>
            <p>None</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleSimulator;
