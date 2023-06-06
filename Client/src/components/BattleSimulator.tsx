import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { fetchPokemonList } from "../util/fetchPokemonList";
import { PokemonType } from "../types/PokemonType";
import { SelectedTeamContext } from "./pokemon/SelectedTeamContext";

const BattleSimulator = () => {
  const { isLoading, error, data } = useQuery<PokemonType[], Error>(
    ["pokemonList"],
    () => fetchPokemonList(0, 151)
  );
  const [computerPokemon, setComputerPokemon] = useState<PokemonType[]>([]);
  const [releasedPokemon, setReleasedPokemon] = useState<number[]>([]);
  const { selectedTeam, setSelectedTeam } = useContext(SelectedTeamContext);
  const [pokemonData, setPokemonData] = useState<any>(null);

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

  const switchPokemon = (index: number) => {
    const selectedPokemon = selectedTeam[0];
    const reservedPokemon = selectedTeam[index];
    const updatedTeam = [...selectedTeam];
    updatedTeam[0] = reservedPokemon;
    updatedTeam[index] = selectedPokemon;
    setSelectedTeam(updatedTeam);
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

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Computer&apos;s Pokemon</h1>
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
            </li>
          );
        })}
      </ul>

      <div>
        <h2>Selected Pokemon:</h2>
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
                    <span key={move.name}>{move.name}, </span>
                  ))}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p>None</p>
        )}
      </div>
      <div>
        <h2>Reserved Pokemon:</h2>
        <ul>
          {selectedTeam.slice(1).map((pokemon, index) => (
            <li key={pokemon.id}>
              {pokemon.name}
              <button onClick={() => switchPokemon(index + 1)}>Switch</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BattleSimulator;
