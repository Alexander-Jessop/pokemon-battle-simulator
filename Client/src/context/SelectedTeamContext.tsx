import React, { createContext, useState, ReactNode } from "react";
import { PokemonType } from "../types/PokemonType";

interface SelectedTeamContextType {
  selectedTeam: PokemonType[];
  setSelectedTeam: React.Dispatch<React.SetStateAction<PokemonType[]>>;
}

export const SelectedTeamContext = createContext<SelectedTeamContextType>({
  selectedTeam: [],
  setSelectedTeam: () => {},
});

interface SelectedTeamProviderProps {
  children: ReactNode;
}

export const SelectedTeamProvider: React.FC<SelectedTeamProviderProps> = ({
  children,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<PokemonType[]>([]);
  return (
    <SelectedTeamContext.Provider value={{ selectedTeam, setSelectedTeam }}>
      {children}
    </SelectedTeamContext.Provider>
  );
};
