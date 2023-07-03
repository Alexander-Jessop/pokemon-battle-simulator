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
import GameFinishedModal from "../components/WinnerPopUp";
import { deleteGameStateData } from "../util/deleteGameStateData";
import putUserData from "../util/putUserData";

const PokemonStadium = () => {
  const { gameState, setGameState } = useGameState();
  const { selectedTeam, setSelectedTeam } = useSelectedTeam();
  const navigate = useNavigate();
  const [isPosted, setIsPosted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [isLunging, setIsLunging] = useState(false);
  const [isCompLunging, setIsCompLunging] = useState(false);
  const [isTkDmg, setIsTkDmg] = useState(false);
  const [isCompTkDmg, setIsCompTkDmg] = useState(false);
  const [finishedGameDataPost, setFinishedGameDataPost] = useState(false);

  const isPostedRef = useRef(isPosted);

  useEffect(() => {
    if (selectedTeam.length !== 6) {
      navigate("/pokemon-selection", { state: { redirect: true } });
    } else {
      const initGameState = async () => {
        setGameFinished(false);
        setFinishedGameDataPost(false);
        setIsLoading(true);
        try {
          const response = await postGameState(selectedTeam);
          setGameState(response);
          setIsPosted(true);

          const userSession = localStorage.getItem("userSession");
          if (userSession) {
            const userData = JSON.parse(userSession);
            const updatedBattlesPlayed = (userData.battlesPlayed || 0) + 1;

            userData.battlesPlayed = updatedBattlesPlayed;
            putUserData(userData._id, {
              battlesPlayed: updatedBattlesPlayed,
            });

            localStorage.setItem("userSession", JSON.stringify(userData));
          }
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
    if (gameState?.status === "finished" && !finishedGameDataPost) {
      const fetchData = async () => {
        const userSession = localStorage.getItem("userSession");
        setFinishedGameDataPost(true);
        if (userSession) {
          const userData = userSession ? JSON.parse(userSession) : null;

          if (gameState.winner === "player") {
            const updatedGamesWon = (userData.gamesWon || 0) + 1;
            userData.gamesWon = updatedGamesWon;
            await putUserData(userData._id, {
              gamesWon: updatedGamesWon,
            });
          } else if (gameState.winner === "computer") {
            const updatedGamesLost = (userData.gamesLost || 0) + 1;
            userData.gamesLost = updatedGamesLost;
            await putUserData(userData._id, {
              gamesLost: updatedGamesLost,
            });
          }
          localStorage.setItem("userSession", JSON.stringify(userData));
        }
        setGameFinished(true);
      };

      fetchData();
    }
  }, [gameState, finishedGameDataPost]);

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

            const aniDelay = 1500;
            const startDelay = 200;
            setIsCompLunging(true);
            setTimeout(() => {
              setIsTkDmg(true);
            }, startDelay);

            const response = await fetchGameState(gameState.id);
            const updatedGameState = response.data;

            setGameState(updatedGameState);
            setTimeout(() => {
              setIsCompLunging(false);
              setIsTkDmg(false);
            }, aniDelay);
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  const userSession = localStorage.getItem("userSession");
  const playerName = userSession ? JSON.parse(userSession).name : "";

  return (
    <div>
      {gameState && (
        <GameContainer
          pokeData={gameState}
          isPlayerTurn={isPlayerTurn}
          isSwitchMenuOpen={shouldOpenSwitchMenu || false}
          setIsLunging={setIsLunging}
          setIsCompTkDmg={setIsCompTkDmg}
        >
          <SelectedBattlePokemon
            pokeData={gameState.computerPokemon}
            isLunging={isCompLunging}
            isComputer={true}
            isCompTkDmg={isCompTkDmg}
          />

          <SelectedBattlePokemon
            pokeData={gameState.playerPokemon}
            isLunging={isLunging}
            isTkDmg={isTkDmg}
          />
        </GameContainer>
      )}

      {gameFinished && gameState && (
        <GameFinishedModal
          gameState={gameState}
          onClose={handleGameFinishedClose}
          playerName={playerName}
        />
      )}
    </div>
  );
};

export default PokemonStadium;
