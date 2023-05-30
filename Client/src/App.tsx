import React from "react";
import PokemonList from "./components/pokemon/PokemonList";
import { Route, Routes } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/pokemon-selection" element={<PokemonList />} />
    </Routes>
  );
}

export default App;
