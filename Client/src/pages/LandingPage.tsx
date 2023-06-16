import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { fetchPokemonList } from "../util/fetchPokemonList";
import { PokemonType } from "../types/PokemonType";
import RandomizedCollage from "../components/RandomizedCollage";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

const LandingPage = () => {
  const {
    data: pokemonList,
    isLoading,
    error,
  } = useQuery<PokemonType[], Error>("pokemonList", () =>
    fetchPokemonList(0, 151)
  );

  const [randomPokemon1, setRandomPokemon1] = useState<PokemonType | null>(
    null
  );
  const [randomPokemon2, setRandomPokemon2] = useState<PokemonType | null>(
    null
  );

  useEffect(() => {
    if (pokemonList && (!randomPokemon1 || !randomPokemon2)) {
      const randomIndex1 = Math.floor(Math.random() * pokemonList.length);
      const randomIndex2 = Math.floor(Math.random() * pokemonList.length);
      setRandomPokemon1(pokemonList[randomIndex1]);
      setRandomPokemon2(pokemonList[randomIndex2]);
    }
  }, [pokemonList, randomPokemon1, randomPokemon2]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error.message} />;
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center
    justify-center bg-gray-900"
    >
      <div className="relative z-10">
        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-8">
          <h1 className="mb-8 text-4xl font-bold text-white">
            Pokemon Battle Simulator
          </h1>
          <div className="mb-4 flex space-x-4">
            {randomPokemon1 && (
              <div className="relative h-32 w-32">
                <img
                  src={randomPokemon1.sprite}
                  alt={randomPokemon1.name}
                  className="absolute inset-0 h-full w-full
                  rounded-full object-cover ring-4 ring-red-600"
                />
              </div>
            )}
            {randomPokemon2 && (
              <div className="relative h-32 w-32">
                <img
                  src={randomPokemon2.sprite}
                  alt={randomPokemon2.name}
                  className="absolute inset-0 h-full w-full
                  rounded-full object-cover ring-4 ring-blue-600"
                />
              </div>
            )}
          </div>
          {randomPokemon1 && randomPokemon2 && (
            <div className="text-lg font-medium text-white">
              <span className="mr-2">{randomPokemon1.name}</span>
              <span className="text-red-600">VS</span>
              <span className="ml-2">{randomPokemon2.name}</span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-0 z-0 m-10 overflow-hidden">
        <RandomizedCollage pokemonList={pokemonList} />
      </div>
      <style>
        {`
        body {
          overflow: hidden;
        }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
