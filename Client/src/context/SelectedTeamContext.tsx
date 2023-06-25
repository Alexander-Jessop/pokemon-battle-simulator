import React, {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { ISelPokeType } from "../types/PokemonType";

interface SelectedTeamContextType {
  selectedTeam: ISelPokeType[];
  setSelectedTeam: Dispatch<SetStateAction<ISelPokeType[]>>;
}

export const SelectedTeamContext = createContext<SelectedTeamContextType>({
  selectedTeam: [],
  setSelectedTeam: () => {},
});

interface SelectedTeamProviderProps {
  children: ReactNode;
}

export const SelectedTeamProvider = ({
  children,
}: SelectedTeamProviderProps) => {
  const [selectedTeam, setSelectedTeam] = useState<ISelPokeType[]>([]);
  return (
    <SelectedTeamContext.Provider value={{ selectedTeam, setSelectedTeam }}>
      {children}
    </SelectedTeamContext.Provider>
  );
};
