import { ReactNode, useState, useEffect } from "react";
import PokemonAttacks from "../components/PokemonAttacks";
import { IBattleData } from "../types/ApiType";
import SwitchMenu from "./SwitchMenu";

interface GameContainerProps {
  children: ReactNode;
  pokeData: IBattleData;
  isPlayerTurn: boolean;
  isSwitchMenuOpen: boolean;
}

const GameContainer = ({
  children,
  pokeData,
  isPlayerTurn,
  isSwitchMenuOpen: propSwitchMenuOpen,
}: GameContainerProps) => {
  const [isSwitchMenuOpen, setIsSwitchMenuOpen] = useState(propSwitchMenuOpen);

  useEffect(() => {
    setIsSwitchMenuOpen(propSwitchMenuOpen);
  }, [propSwitchMenuOpen]);

  const toggleSwitchMenu = () => {
    setIsSwitchMenuOpen((prevState) => !prevState);
  };

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
        {isSwitchMenuOpen && (
          <SwitchMenu pokeData={pokeData} toggleMenu={toggleSwitchMenu} />
        )}
        <PokemonAttacks pokeData={pokeData} isPlayerTurn={isPlayerTurn} />
        <button
          onClick={toggleSwitchMenu}
          className="m-2 min-w-[10rem] rounded-lg bg-primary-200 p-2
          capitalize text-white shadow"
        >
          switch pokemon
        </button>
      </div>
    </div>
  );
};

export default GameContainer;
