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
import patchComputerSwitchPokemon from "../util/patchComputerSwitchPokemon";
import WinnerPopUp from "../components/WinnerPopUp";
import { deleteGameStateData } from "../util/deleteGameStateData";

const PokemonStadium = () => {
  const { gameState, setGameState } = useGameState();
  const { selectedTeam, setSelectedTeam } = useSelectedTeam();
  const navigate = useNavigate();
  const [isPosted, setIsPosted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const isPostedRef = useRef(isPosted);

  useEffect(() => {
    if (selectedTeam.length !== 6) {
      navigate("/pokemon-selection", { state: { redirect: true } });
    } else {
      const initGameState = async () => {
        setGameFinished(false);
        setIsLoading(true);
        try {
          const response = await postGameState(selectedTeam);
          setGameState(response);
          setIsPosted(true);
        } catch (error) {
          setError("Failed to post game state");
        }
        setIsLoading(false);
      };

      if (!isPostedRef.current) {
        initGameState();
        isPostedRef.current = true;
      }

      if (gameState) {
        const currentPlayer = gameState.currentPlayer;
        setIsPlayerTurn(currentPlayer === 1);
      }
    }
  }, [selectedTeam, gameState, navigate]);

  useEffect(() => {
    if (gameState?.status === "finished") {
      setGameFinished(true);
    }
  }, [gameState]);

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

        if (move && !computerPokemon.isFainted) {
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

        if (computerPokemon?.isFainted) {
          try {
            await patchComputerSwitchPokemon(gameState.id);

            const response = await fetchGameState(gameState.id);
            const updatedGameState = response.data;

            setGameState(updatedGameState);
          } catch (error) {
            setError("Failed to switch computer's Pokémon");
          }
        }
      }
    };

    const delay = 1500;
    const timeoutId = setTimeout(computerAttack, delay);

    return () => clearTimeout(timeoutId);
  }, [isPlayerTurn, gameState, setGameState]);

  const shouldOpenSwitchMenu = gameState?.playerPokemon.some(
    (pokemon) => pokemon.isInBattle && pokemon.isFainted
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  const handleGameFinishedClose = async () => {
    try {
      if (gameState && gameState.id) {
        await deleteGameStateData(gameState.id);
        setGameState(null);
        setSelectedTeam([]);
        setGameFinished(false);
        navigate("/pokemon-selection");
      } else {
        setError("Invalid game state");
      }
    } catch (error) {
      setError("Failed to delete game state");
    }
  };

  return (
    <div>
      {gameState && (
        <GameContainer
          pokeData={gameState}
          isPlayerTurn={isPlayerTurn}
          isSwitchMenuOpen={shouldOpenSwitchMenu || false}
        >
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

      {gameFinished && gameState && (
        <WinnerPopUp gameState={gameState} onClose={handleGameFinishedClose} />
      )}
    </div>
  );
};

export default PokemonStadium;
