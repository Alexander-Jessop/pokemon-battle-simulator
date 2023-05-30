import React, { useEffect, useState } from "react";
import axios from "axios";

import PokemonCard from "./PokemonCard";

const POKEMON_LIST_API = import.meta.env.VITE_POKEMON_LIST_API?.toString();

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

const PokemonList: React.FC<Pokemon> = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get<Pokemon[]>(POKEMON_LIST_API);
        setPokemonList(response.data);
      } catch (error) {
        setError("Failed to fetch Pokemon list.");
        if (retryCount < 3) {
          setRetryCount(retryCount + 1);
          setTimeout(() => {
            fetchPokemonList();
          }, 1000);
        }
      }
    };

    fetchPokemonList();
  }, [retryCount]);

  return (
    <div>
      <h1>Pokemon List</h1>
      {error && <p>{error}</p>}
      {pokemonList.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
};

export default PokemonList;
