import React, { createContext, useState } from "react";

export const SelectedTeamContext = createContext();

export const SelectedTeamProvider = ({ children }) => {
  const [selectedTeam, setSelectedTeam] = useState([]);

  return (
    <SelectedTeamContext.Provider value={{ selectedTeam, setSelectedTeam }}>
      {children}
    </SelectedTeamContext.Provider>
  );
};
