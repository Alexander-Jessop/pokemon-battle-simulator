import { IBattleData } from "../types/ApiType";
import patchPokemonAttack from "../util/patchPokemonAttack";

interface PropsData {
  pokeData: IBattleData;
}

const PokemonAttacks = ({ pokeData }: PropsData) => {
  const currentPokemon = pokeData.playerPokemon.find(
    (pokemon) => pokemon.isInBattle
  );

  const moves = currentPokemon?.moves ?? [];

  const handleAttack = async (
    moveUrl: string,
    battleId: string,
    isPlayer: number
  ) => {
    try {
      await patchPokemonAttack(moveUrl, battleId, isPlayer);
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
          onClick={() =>
            handleAttack(move.move.url, pokeData.id, pokeData.currentPlayer)
          }
        >
          {move.move.name}
        </button>
      ))}
    </div>
  );
};

export default PokemonAttacks;
