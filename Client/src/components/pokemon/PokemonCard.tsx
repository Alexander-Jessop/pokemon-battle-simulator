import { ISelPokeType } from "../../types/PokemonType";

interface Props {
  pokemon: ISelPokeType;
  onSelect: (pokemon: ISelPokeType) => void;
  isSelected: boolean;
}

const PokemonCard = ({ pokemon, onSelect, isSelected }: Props) => {
  const handleSelect = () => {
    onSelect(pokemon);
  };

  if (isSelected) {
    return (
      <div
        className="min-w-[25rem] overflow-hidden rounded-lg bg-primary-600
      shadow-lg transition duration-300 hover:-translate-y-1
      hover:shadow-xl"
      >
        <div className="relative m-4 flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="flex h-14 w-14 items-center justify-center
            rounded-full border-4 border-white text-xl font-bold text-white"
            >
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={pokemon.sprite}
                alt={pokemon.name}
              />
            </div>
            <h3 className="ml-4 text-2xl font-semibold capitalize text-white">
              {pokemon.name}
            </h3>
          </div>
          <button
            className="ml-2 max-w-[8rem] grow rounded bg-primary-400 px-4 py-2
            font-bold text-white
            hover:bg-primary-200"
            onClick={handleSelect}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="m-4 overflow-hidden rounded-lg bg-white shadow-lg transition
    duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative bg-primary-700 p-4">
        <h3 className="text-2xl font-semibold capitalize text-white">
          {pokemon.name}
        </h3>
      </div>
      <div className="mb-4 mt-2 flex justify-center">
        <div className="m-4 rounded-full bg-secondary-500 p-2 shadow-inner">
          <div
            className="h-48 w-48 overflow-hidden rounded-full border-4
          border-white"
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
          className={`grow px-4 py-2 font-bold text-white ${
            isSelected
              ? "bg-primary-500 hover:bg-primary-700"
              : "bg-blue-500 hover:bg-blue-700"
          } mr-2`}
          onClick={handleSelect}
        >
          {isSelected ? "Remove" : "Select"}
        </button>
        <button
          className="grow bg-gray-500 px-4 py-2 font-bold text-white
        hover:bg-gray-700"
        >
          Pokedex
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
