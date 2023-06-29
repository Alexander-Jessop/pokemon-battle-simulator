import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import SelectPokemonPage from "./pages/SelectPokemonPage";
import LoginPage from "./pages/LoginPage";
import PokemonStadium from "./pages/PokemonStadium";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/pokemon-selection" element={<SelectPokemonPage />} />
        <Route path="/battle" element={<PokemonStadium />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
