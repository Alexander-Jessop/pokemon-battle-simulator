import { PokemonType } from "../../types/PokemonType";

type PokemonImageProps = {
  pokemon: PokemonType;
  ringColor: string;
};

const PokemonImage = ({ pokemon, ringColor }: PokemonImageProps) => (
  <div className="relative h-32 w-32">
    <img
      src={pokemon.sprite}
      alt={pokemon.name}
      className={`absolute inset-0 h-full w-full rounded-full
      object-cover ring-4 ${ringColor}`}
    />
  </div>
);

export default PokemonImage;
