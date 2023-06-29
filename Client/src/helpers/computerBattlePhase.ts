import patchPokemonAttack from "../util/patchPokemonAttack";
import { IBattleData } from "../types/ApiType";
import { IPokeDetails } from "../types/PokemonType";

export const handleAttack = async (
  moveUrl: string,
  battleId: string,
  isPlayer: number,
  selectedTeam: IPokeDetails[],
  setGameState: (state: IBattleData | null) => void,
  setIsLoading: (isLoading: boolean) => void,
  setIsPlayerTurn: (isPlayerTurn: boolean) => void,
  setError: (error: string) => void,
  handleComputerTurn: () => Promise<void>
) => {
  setIsLoading(true);
  try {
    await patchPokemonAttack(moveUrl, battleId, isPlayer);

    setIsPlayerTurn(false);
    await handleComputerTurn();
  } catch (error) {
    setError("Failed to perform attack");
  }
  setIsLoading(false);
};

export const handleComputerTurn = async (
  gameState: IBattleData,
  setIsPlayerTurn: (isPlayerTurn: boolean) => void,
  handleAttack: (
    moveUrl: string,
    battleId: string,
    isPlayer: number,
    selectedTeam: IPokeDetails[],
    setGameState: (state: IBattleData | null) => void,
    setIsLoading: (isLoading: boolean) => void,
    setIsPlayerTurn: (isPlayerTurn: boolean) => void,
    setError: (error: string) => void,
    handleComputerTurn: () => Promise<void>
  ) => Promise<void>,
  setIsLoading: (isLoading: boolean) => void
) => {
  try {
    const computerPokemon = gameState.computerPokemon.find(
      (pokemon) => pokemon.isInBattle
    );

    if (computerPokemon && computerPokemon.moves.length > 0) {
      // Randomly select a move from the computer's available moves
      const randomMoveIndex = Math.floor(
        Math.random() * computerPokemon.moves.length
      );
      const selectedMove = computerPokemon.moves[randomMoveIndex];

      // Perform the computer's attack
      await handleAttack(
        selectedMove.move.url,
        gameState.id,
        gameState.currentPlayer,
        selectedTeam,
        setGameState,
        setIsLoading,
        setIsPlayerTurn,
        setError,
        handleComputerTurn
      );
    } else {
      // No moves available, proceed to the next turn
      setIsPlayerTurn(true);
    }
  } catch (error) {
    setError("Failed to perform computer's turn");
  }
};
