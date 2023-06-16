import { PokemonType } from "../types/PokemonType";
import { useMemo } from "react";

interface RandomizedCollageProps {
  pokemonList?: PokemonType[];
}

const RandomizedCollage = ({ pokemonList }: RandomizedCollageProps) => {
  const randomizedCollage = useMemo(() => {
    if (pokemonList) {
      return [...pokemonList].sort(() => Math.random() - 0.5);
    }
    return [];
  }, [pokemonList]);

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

export default RandomizedCollage;
