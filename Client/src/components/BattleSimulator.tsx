import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchPokemonList } from "../util/fetchPokemonList";
import { PokemonType } from "../types/PokemonType";
import axios from "axios";

const BattleSimulator = () => {
  const { isLoading, error, data } = useQuery<PokemonType[], Error>(
    ["pokemonList"],
    () => fetchPokemonList(0, 151)
  );
  const [computerPokemon, setComputerPokemon] = useState<PokemonType[]>([]);
  const [releasedPokemon, setReleasedPokemon] = useState<number[]>([]);

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

      // Fetch Pokemon information for the first Pokemon
      const fetchPokemonInformation = async () => {
        const firstPokemon = randomPokemon[0];
        const response = await axios.get(
          import.meta.env.VITE_POKEMON_BATTLEING_API + firstPokemon.name
        );
        const { sprites, types, moves } = response.data;

        console.log("Sprites:", sprites);
        console.log("Types:", types);
        console.log("Moves:", moves);
      };

      fetchPokemonInformation();
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
    </div>
  );
};

export default BattleSimulator;
