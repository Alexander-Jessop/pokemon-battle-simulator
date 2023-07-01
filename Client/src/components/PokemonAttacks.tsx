import { Dispatch, SetStateAction } from "react";
import { IBattleData } from "../types/ApiType";
import patchPokemonAttack from "../util/patchPokemonAttack";
import { useGameState } from "../context/GameStateContext";
import fetchGameState from "../util/fetchGameState";
import putUserData from "../util/putUserData";

interface PropsData {
  pokeData: IBattleData;
  isPlayerTurn: boolean;
  setIsLunging: Dispatch<SetStateAction<boolean>>;
  setIsCompTkDmg: Dispatch<SetStateAction<boolean>>;
}

const PokemonAttacks = ({
  pokeData,
  isPlayerTurn,
  setIsLunging,
  setIsCompTkDmg,
}: PropsData) => {
  const { setGameState } = useGameState();
  const currentPokemon = pokeData.playerPokemon.find(
    (pokemon) => pokemon.isInBattle
  );

  const moves = currentPokemon?.moves ?? [];

  const handleAttack = async (
    moveUrl: string,
    battleId: string,
    isPlayer: number,
    setIsLunging: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      await patchPokemonAttack(moveUrl, battleId, isPlayer);

      const aniDelay = 1500;
      const startDelay = 200;
      setIsLunging(true);
      setTimeout(() => {
        setIsCompTkDmg(true);
      }, startDelay);

      const response = await fetchGameState(battleId);
      const updatedGameState = response.data;

      setGameState(updatedGameState);

      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const userData = JSON.parse(userSession);
        const updatedMovesUsed = userData.movesUsed + 1;

        userData.movesUsed = updatedMovesUsed;

        await putUserData(userData._id, { movesUsed: updatedMovesUsed });
        localStorage.setItem("userSession", JSON.stringify(userData));
      }

      setTimeout(() => {
        setIsLunging(false);
        setIsCompTkDmg(false);
      }, aniDelay);
    } catch (error) {
      throw new Error("Failed to perform attack:");
    }
  };

  return (
    <div className="flex max-w-lg flex-wrap">
      {moves.map((move) => (
        <button
          key={move.move.name}
          className={`m-2 min-w-[10rem] rounded-lg p-2 capitalize text-white shadow
          ${!isPlayerTurn ? "bg-gray-300" : "bg-primary-200"}`}
          onClick={() =>
            handleAttack(
              move.move.url,
              pokeData.id,
              pokeData.currentPlayer,
              setIsLunging
            )
          }
          disabled={!isPlayerTurn}
        >
          {move.move.name}
        </button>
      ))}
    </div>
  );
};

export default PokemonAttacks;
