import { IPokeDetails } from "../types/PokemonType";

interface PropsData {
  pokeData: IPokeDetails[];
}

const PokemonAttacks = ({ pokeData }: PropsData) => {
  const currentPokemon = pokeData.find((pokemon) => pokemon.isInBattle);

  const moves = currentPokemon?.moves ?? [];

  const handleAttack = async (moveUrl: string) => {
    try {
    } catch (error) {
      console.error("Failed to perform attack:", error);
    }
  };

  return (
    <div className="flex max-w-lg flex-wrap">
      {moves.map((move) => (
        <button
          key={move.move.name}
          className="m-2 min-w-[10rem] rounded-lg bg-primary-200 p-2
          text-white shadow"
          onClick={() => handleAttack(move.move.url)}
        >
          {move.move.name}
        </button>
      ))}
    </div>
  );
};

export default PokemonAttacks;
