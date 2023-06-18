import React, { createContext, useState, ReactNode } from "react";
import { PokemonType } from "../types/PokemonType";

interface SelectedTeamContextType {
  selectedTeam: PokemonType[];
  setSelectedTeam:
    | React.Dispatch<React.SetStateAction<PokemonType[]>>
    | ((team: PokemonType[]) => void);
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
  const [selectedTeam, setSelectedTeam] = useState<PokemonType[]>([]);
  return (
    <SelectedTeamContext.Provider value={{ selectedTeam, setSelectedTeam }}>
      {children}
    </SelectedTeamContext.Provider>
  );
};
