import React from "react";
import { PokemonType } from "../../types/PokemonType";

interface Props {
  pokemon: PokemonType;
  onSelect: (pokemon: PokemonType) => void;
  isSelected: boolean;
}

const PokemonCard: React.FC<Props> = ({ pokemon, onSelect, isSelected }) => {
  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const handleSelect = () => {
    onSelect(pokemon);
  };

  const selectButtonClassName = `rounded bg-blue-500 px-4 py-2 
    font-bold text-white hover:bg-blue-700 ${isSelected ? "bg-blue-700" : ""}`;

  return (
    <div className="m-4 overflow-hidden rounded-lg bg-white shadow-lg">
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
        <button className={selectButtonClassName} onClick={handleSelect}>
          {isSelected ? "Remove" : "Select"}
        </button>
        <button
          className="rounded bg-gray-500 px-4 py-2
        font-bold text-white hover:bg-gray-700"
        >
          Pokedex
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
