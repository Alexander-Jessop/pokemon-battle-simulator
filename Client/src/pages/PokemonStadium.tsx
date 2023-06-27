import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedTeam } from "../hooks/useSelectedTeam";
import postGameState from "../util/postGameState";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import GameContainer from "../components/GameContainer";
import SelectedBattlePokemon from "../components/pokemon/SelectedBattlePokemon";
import { useGameState } from "../context/GameStateContext";
import patchPokemonAttack from "../util/patchPokemonAttack";
import fetchGameState from "../util/fetchGameState";

const PokemonStadium = () => {
  const { gameState, setGameState } = useGameState();
  const { selectedTeam } = useSelectedTeam();
  const navigate = useNavigate();
  const [isPosted, setIsPosted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);

  const isPostedRef = useRef(isPosted);

  useEffect(() => {
    if (selectedTeam.length !== 6) {
      navigate("/pokemon-selection", { state: { redirect: true } });
    } else {
      const initGameState = async () => {
        setIsLoading(true);
        try {
          const response = await postGameState(selectedTeam);
          setGameState(response);
          setIsPosted(true);

          const currentPlayer = response.currentPlayer;
          setIsPlayerTurn(currentPlayer === 1);
          console.log("response", response);
        } catch (error) {
          setError("Failed to post game state");
        }
        setIsLoading(false);
      };

      if (!isPostedRef.current) {
        initGameState();
        isPostedRef.current = true;
      }
    }
  }, [selectedTeam, navigate]);

  useEffect(() => {
    const computerAttack = async () => {
      if (!isPlayerTurn && gameState?.currentPlayer === 0) {
        const computerPokemon = gameState.computerPokemon.find(
          (pokemon) => pokemon.isInBattle
        );
        const moveIndex = Math.floor(
          Math.random() * (computerPokemon?.moves.length ?? 0)
        );
        const move = computerPokemon?.moves[moveIndex];

        if (move) {
          try {
            await patchPokemonAttack(
              move.move.url,
              gameState.id,
              gameState.currentPlayer
            );

            const response = await fetchGameState(gameState.id);
            const updatedGameState = response.data;

            setGameState(updatedGameState);
          } catch (error) {
            setError("Failed to perform computer attack");
          }
        }
      }
    };

    computerAttack();
  }, [isPlayerTurn, gameState, setGameState]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <div>
      {gameState && (
        <GameContainer pokeData={gameState} isPlayerTurn={isPlayerTurn}>
          <SelectedBattlePokemon
            pokeData={gameState.computerPokemon}
            isLunging={false}
            isComputer={true}
          />

          <SelectedBattlePokemon
            pokeData={gameState.playerPokemon}
            isLunging={false}
          />
        </GameContainer>
      )}
    </div>
  );
};

export default PokemonStadium;
