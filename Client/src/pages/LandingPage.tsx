import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { fetchPokemonList } from "../util/fetchPokemonList";
import { PokemonType } from "../types/PokemonType";
import randomPokemon from "../util/randomPokemon";
import RandomizedCollage from "../components/RandomizedCollage";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import PokemonImage from "../components/pokemon/PokemonVsImage";

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
      setRandomPokemon1(randomPokemon(pokemonList));
      setRandomPokemon2(randomPokemon(pokemonList));
    }
  }, [pokemonList, randomPokemon1, randomPokemon2]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error.message} />;
  }

  return (
    <div
      className="flex h-screen w-full flex-col
      items-center justify-center bg-gray-900"
    >
      <div className="z-10">
        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-8">
          <h1 className="mb-8 text-4xl font-bold text-white">
            Pokemon Battle Simulator
          </h1>
          <div className="mb-4 flex space-x-4">
            {randomPokemon1 && (
              <PokemonImage pokemon={randomPokemon1} ringColor="ring-red-600" />
            )}
            {randomPokemon2 && (
              <PokemonImage
                pokemon={randomPokemon2}
                ringColor="ring-blue-600"
              />
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
      <div className="width-full absolute z-0 h-screen overflow-hidden">
        <RandomizedCollage pokemonList={pokemonList} />
      </div>
    </div>
  );
};

export default LandingPage;
