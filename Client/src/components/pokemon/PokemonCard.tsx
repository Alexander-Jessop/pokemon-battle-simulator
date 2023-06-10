import { PokemonType } from "../../types/PokemonType";

interface Props {
  pokemon: PokemonType;
  onSelect: (pokemon: PokemonType) => void;
  isSelected: boolean;
}

const PokemonCard = ({ pokemon, onSelect, isSelected }: Props) => {
  const handleSelect = () => {
    onSelect(pokemon);
  };

  const selectButtonClassName = `flex-grow px-4 py-2 font-bold text-white ${
    isSelected
      ? "bg-primary-500 hover:bg-primary-700"
      : "bg-blue-500 hover:bg-blue-700"
  }`;

  const pokedexButtonClassName = `flex-grow bg-gray-500 px-4 py-2
  font-bold text-white hover:bg-gray-700`;

  return (
    <div
      className="m-4 transform overflow-hidden rounded-lg
    bg-white shadow-lg transition duration-300
    hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="bg-primary-700 p-4">
        <h3 className="text-2xl font-semibold capitalize text-white">
          {pokemon.name}
        </h3>
      </div>
      <div className="mb-4 mt-2 flex justify-center">
        <div className="m-4 rounded-full bg-secondary-500 p-2 shadow-inner">
          <div
            className="h-48 w-48 overflow-hidden
          rounded-full border-4 border-white"
          >
            <img
              className="h-full w-full object-contain"
              src={pokemon.sprite}
              alt={pokemon.name}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className={`${selectButtonClassName} mr-2`}
          onClick={handleSelect}
        >
          {isSelected ? "Remove" : "Select"}
        </button>
        <button className={pokedexButtonClassName}>Pokedex</button>
      </div>
    </div>
  );
};

export default PokemonCard;
