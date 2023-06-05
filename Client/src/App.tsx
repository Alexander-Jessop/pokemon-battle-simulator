import React from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import SelectPokemonPage from "./pages/SelectPokemonPage";
import BattleSimulator from "./components/BattleSimulator";

function App(): React.JSX.Element {
  return (
    <NavBar>
      <Routes>
        <Route path="/pokemon-selection" element={<SelectPokemonPage />} />
        <Route path="/battle" element={<BattleSimulator />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </NavBar>
  );
}

export default App;
