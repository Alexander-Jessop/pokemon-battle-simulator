import { useNavigate } from "react-router-dom";
import { useSelectedTeam } from "../hooks/useSelectedTeam";
import PokemonList from "../components/pokemon/PokemonList";
import SelectedPokemonSection from "../components/pokemon/SelectedPokemonSection";

const SelectPokemonPage = () => {
  const BATTLE_PATH = "/battle";
  const navigate = useNavigate();
  const { selectedTeam, handleSelectOrRemove, isReadyToBattle } =
    useSelectedTeam();

  const handleReadyToBattle = () => {
    navigate(BATTLE_PATH);
  };

  return (
    <div>
      <div className="flex flex-wrap">
        <SelectedPokemonSection
          selectedTeam={selectedTeam}
          handleSelectOrRemove={handleSelectOrRemove}
          isReadyToBattle={isReadyToBattle}
          onReadyToBattle={handleReadyToBattle}
        />
      </div>
      <PokemonList />
    </div>
  );
};

export default SelectPokemonPage;
