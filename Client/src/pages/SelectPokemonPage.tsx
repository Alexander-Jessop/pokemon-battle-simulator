import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelectedTeam } from "../hooks/useSelectedTeam";
import PokemonList from "../components/pokemon/PokemonList";
import { PokemonType } from "../types/PokemonType";
import PokemonCard from "../components/pokemon/PokemonCard";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

const SelectPokemonPage = () => {
  const navigate = useNavigate();
  const { selectedTeam, handleSelectOrRemove, isReadyToBattle } =
    useSelectedTeam();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReadyToBattle = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/pokemon/selected", selectedTeam);
      navigate("/battle");
    } catch (error) {
      setError("Failed to prepare for battle. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderSelectedPokemon = () => {
    if (selectedTeam.length === 0) {
      return null;
    }

    return (
      <div className="mx-auto max-w-8xl py-6">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Selected Pokemon:
        </h2>
        <div
          className="grid grid-cols-1 justify-items-center gap-4
        md:grid-cols-2 lg:grid-cols-3"
        >
          {selectedTeam.map((pokemon: PokemonType) => (
            <div key={pokemon.id}>
              <PokemonCard
                pokemon={pokemon}
                onSelect={() => handleSelectOrRemove(pokemon)}
                isSelected={true}
                selectedPokemonCount={selectedTeam.length}
              />
            </div>
          ))}
        </div>
        {isReadyToBattle() && (
          <div className="mt-4 flex justify-center">
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white
              hover:bg-blue-600"
              onClick={handleReadyToBattle}
            >
              Ready to Battle
            </button>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <div>
      <div className="flex flex-wrap">{renderSelectedPokemon()}</div>
      <PokemonList />
    </div>
  );
};

export default SelectPokemonPage;
