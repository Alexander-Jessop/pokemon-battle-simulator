import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { IBattleData } from "../types/ApiType";

interface GameStateContextType {
  gameState: IBattleData | null;
  setGameState: Dispatch<SetStateAction<IBattleData | null>>;
}

const GameStateContext = createContext<GameStateContextType | undefined>(
  undefined
);

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
};

interface GameStateProviderProps {
  children: ReactNode;
}

export const GameStateProvider = ({ children }: GameStateProviderProps) => {
  const [gameState, setGameState] = useState<IBattleData | null>(null);

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};
