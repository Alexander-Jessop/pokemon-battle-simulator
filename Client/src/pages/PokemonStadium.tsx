import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedTeam } from "../hooks/useSelectedTeam";
import postGameState from "../util/postGameState";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import GameContainer from "../components/GameContainer";
import SelectedBattlePokemon from "../components/pokemon/SelectedBattlePokemon";
import { IBattleData } from "../types/ApiType";

const PokemonStadium = () => {
  const { selectedTeam } = useSelectedTeam();
  const navigate = useNavigate();
  const [isPosted, setIsPosted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [gameState, setGameState] = useState<IBattleData | null>(null);

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <div>
      {gameState && (
        <GameContainer pokeData={gameState}>
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
