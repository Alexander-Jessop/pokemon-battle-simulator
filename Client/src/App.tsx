import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import SelectPokemonPage from "./pages/SelectPokemonPage";
import BattlePage from "./pages/BattlePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/pokemon-selection" element={<SelectPokemonPage />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
