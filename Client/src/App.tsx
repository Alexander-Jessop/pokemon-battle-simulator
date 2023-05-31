import React from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import PokemonList from "./components/pokemon/PokemonList";

function App(): React.JSX.Element {
  return (
    <NavBar>
      <Routes>
        <Route path="/pokemon-selection" element={<PokemonList />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </NavBar>
  );
}

export default App;
