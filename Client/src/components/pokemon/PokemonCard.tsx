import React from "react";
import { PokemonType } from "../types/PokemonType";

interface Props {
  pokemon?: PokemonType;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  if (!pokemon) {
    return <div>Pokemon is lost in the wild.</div>;
  }

  return (
    <div
      className={
        "m-4 flex flex-col items-center rounded-lg border border-gray-300 p-4"
      }
    >
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprite} alt={pokemon.name} />
    </div>
  );
};

export default PokemonCard;
