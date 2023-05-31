import React, { useEffect, useState } from "react";
import axios from "axios";

import { PokemonType } from "../../types/PokemonType";
import PokemonCard from "./PokemonCard";

const POKEMON_LIST_API = import.meta.env.VITE_POKEMON_LIST_API?.toString();

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get<PokemonType[]>(POKEMON_LIST_API);
        setPokemonList(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch Pokemon list.");
        setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <div className="m-10 flex flex-wrap justify-center">
        {pokemonList.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
