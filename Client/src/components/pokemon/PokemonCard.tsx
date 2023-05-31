import React from "react";
import { PokemonType } from "../types/PokemonType";
import { NavButton } from "../buttons";

interface Props {
  pokemon?: PokemonType;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const renderPokemon = () => {
    if (!pokemon) {
      return <div>Pokemon is lost in the wild.</div>;
    }

    return (
      <>
        <h3 className="bg-accent-500 p-4 text-xl font-bold text-white">
          {capitalize(pokemon.name)}
        </h3>
        <div className="flex justify-center">
          <img
            className="m-4 h-32 w-32"
            src={pokemon.sprite}
            alt={pokemon.name}
          />
        </div>
        <div>
          <button
            className={`rounded bg-blue-500 px-4 py-2 font-bold
             text-white hover:bg-blue-700`}
          >
            Select
          </button>
          <button
            className={`rounded bg-gray-500 px-4 py-2 font-bold 
            text-white hover:bg-gray-700`}
          >
            Pokedex
          </button>
        </div>
      </>
    );
  };

  return (
    <div className={" m-4 overflow-hidden rounded-lg bg-white shadow-lg"}>
      {renderPokemon()}
    </div>
  );
};

export default PokemonCard;
