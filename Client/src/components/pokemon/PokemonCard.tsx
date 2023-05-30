import React from "react";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprite} alt={pokemon.name} />
    </div>
  );
};

export default PokemonCard;
