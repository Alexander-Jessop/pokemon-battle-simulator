import React, { useEffect, useState } from "react";
import axios from "axios";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

const LandingPage = () => {
  const [randomPokemon1, setRandomPokemon1] = useState<Pokemon | null>(null);
  const [randomPokemon2, setRandomPokemon2] = useState<Pokemon | null>(null);
  const [pokemonCollage, setPokemonCollage] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const response = await axios.get<Pokemon[]>(
          import.meta.env.VITE_POKEMON_LIST_API + "?limit=151"
        );
        const pokemonList = response.data;
        const randomIndex1 = Math.floor(Math.random() * pokemonList.length);
        const randomIndex2 = Math.floor(Math.random() * pokemonList.length);
        const randomPokemon1 = pokemonList[randomIndex1];
        const randomPokemon2 = pokemonList[randomIndex2];
        setRandomPokemon1(randomPokemon1);
        setRandomPokemon2(randomPokemon2);
      } catch (error: unknown) {
        if (typeof error === "string") {
          throw new Error(error);
        } else {
          throw error;
        }
      }
    };

    fetchRandomPokemon();
  }, []);

  useEffect(() => {
    const fetchPokemonCollage = async () => {
      try {
        const response = await axios.get<Pokemon[]>(
          import.meta.env.VITE_POKEMON_LIST_API + "?limit=151"
        );
        setPokemonCollage(response.data);
      } catch (error: unknown) {
        if (typeof error === "string") {
          throw new Error(error);
        } else {
          throw error;
        }
      }
    };

    fetchPokemonCollage();
  }, []);

  const RandomizedCollage = () => {
    const randomizedCollage = pokemonCollage.sort(() => Math.random() - 0.5);

    return (
      <div className="mx-auto max-w-8xl p-8">
        <div className="flex flex-wrap justify-center" style={{ opacity: 0.7 }}>
          {randomizedCollage.map((pokemon, index) => (
            <div
              key={pokemon.id}
              className="relative m-2 flex h-32 w-32 items-center
              justify-center overflow-hidden rounded-lg"
              style={{
                perspective: "500px",
                zIndex: index + 1,
                transform: `rotate(${index % 2 === 0 ? "-" : ""}6deg)`,
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

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
        <RandomizedCollage />
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
