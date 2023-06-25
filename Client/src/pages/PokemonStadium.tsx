import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedTeam } from "../hooks/useSelectedTeam";

const PokemonStadium = () => {
  const { selectedTeam } = useSelectedTeam();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTeam.length !== 6) {
      navigate("/pokemon-selection", { state: { redirect: true } });
    }
  }, [selectedTeam, navigate]);

  return (
    <div>
      {selectedTeam.map((pokemon) => (
        <div key={pokemon.id}>{pokemon.name}</div>
      ))}
    </div>
  );
};

export default PokemonStadium;
