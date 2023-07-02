import {
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import PokemonAttacks from "../components/PokemonAttacks";
import { IBattleData } from "../types/ApiType";
import SwitchMenu from "./SwitchMenu";

interface GameContainerProps {
  children: ReactNode;
  pokeData: IBattleData;
  isPlayerTurn: boolean;
  isSwitchMenuOpen: boolean;
  setIsLunging: Dispatch<SetStateAction<boolean>>;
  setIsCompTkDmg: Dispatch<SetStateAction<boolean>>;
}

const GameContainer = ({
  children,
  pokeData,
  isPlayerTurn,
  isSwitchMenuOpen: propSwitchMenuOpen,
  setIsLunging,
  setIsCompTkDmg,
}: GameContainerProps) => {
  const [isSwitchMenuOpen, setIsSwitchMenuOpen] = useState(propSwitchMenuOpen);

  useEffect(() => {
    setTimeout(() => {
      setIsSwitchMenuOpen(propSwitchMenuOpen);
    }, 1800);
  }, [propSwitchMenuOpen]);

  const toggleSwitchMenu = () => {
    setIsSwitchMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="mt-60 flex w-full flex-col items-center overflow-hidden">
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
        <PokemonAttacks
          pokeData={pokeData}
          isPlayerTurn={isPlayerTurn}
          setIsLunging={setIsLunging}
          setIsCompTkDmg={setIsCompTkDmg}
        />
        <button
          onClick={toggleSwitchMenu}
          className={`m-2 min-w-[10rem] rounded-lg p-2 capitalize text-white shadow
          ${!isPlayerTurn ? "bg-gray-300" : "bg-primary-200"}`}
          disabled={!isPlayerTurn}
        >
          switch pokemon
        </button>
      </div>
    </div>
  );
};

export default GameContainer;
