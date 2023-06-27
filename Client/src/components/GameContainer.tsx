import { ReactNode } from "react";
import PokemonAttacks from "../components/PokemonAttacks";
import { IBattleData } from "../types/ApiType";

interface GameContainerProps {
  children: ReactNode;
  pokeData: IBattleData;
  isPlayerTurn: boolean;
}

const GameContainer = ({
  children,
  pokeData,
  isPlayerTurn,
}: GameContainerProps) => {
  return (
    <div className="mt-60 flex w-full flex-col items-center">
      <div className="w-1/3 min-w-[40rem]">
        <div>
          <div
            className="relative h-96 rounded-lg border
          border-gray-500 p-4 shadow-inner"
          >
            {children}
          </div>
        </div>
        <PokemonAttacks pokeData={pokeData} isPlayerTurn={isPlayerTurn} />
      </div>
    </div>
  );
};

export default GameContainer;
