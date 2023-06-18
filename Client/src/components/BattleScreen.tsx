import { useState, useEffect } from "react";
import axios from "axios";
import { fetchPokemonList } from "../util/fetchPokemonList";
import { PokemonType } from "../types/PokemonType";

const BattleSimulator = () => {
  const [computerPokemon, setComputerPokemon] = useState<PokemonType[]>([]);

  const selectRandomPokemon = async () => {
    try {
      const pokemonList = await fetchPokemonList(0, 151);
      const randomPokemon: PokemonType[] = [];
      const totalPokemonCount = pokemonList.length;

      while (randomPokemon.length < 6) {
        const randomIndex = Math.floor(Math.random() * totalPokemonCount);
        const randomPokemonData = pokemonList[randomIndex];
        if (!randomPokemon.includes(randomPokemonData)) {
          randomPokemon.push(randomPokemonData);
        }
      }

      setComputerPokemon(randomPokemon);
    } catch (error) {
      console.error("Failed to fetch Pokemon list:", error);
    }
  };

  useEffect(() => {
    selectRandomPokemon();
  }, []);

  // Rest of the code...
};

export default BattleSimulator;
