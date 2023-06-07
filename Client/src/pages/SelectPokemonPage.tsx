import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedTeam } from "../hooks/useSelectedTeam";
import PokemonList from "../components/pokemon/PokemonList";
import { PokemonType } from "../types/PokemonType";
import PokemonCard from "../components/pokemon/PokemonCard";

const SelectPokemonPage = () => {
  const navigate = useNavigate();

  const { selectedTeam, handleSelectOrRemove, isReadyToBattle } =
    useSelectedTeam();

  const handleReadyToBattle = () => {
    navigate("/battle");
  };

  const renderSelectedPokemon = () => {
    if (selectedTeam.length === 0) {
      return null;
    }

    return (
      <>
        <h2>Selected Pokemon:</h2>
        {selectedTeam.map((pokemon: PokemonType) => (
          <div key={pokemon.id}>
            <PokemonCard
              pokemon={pokemon}
              onSelect={() => handleSelectOrRemove(pokemon)}
              isSelected={true}
            />
          </div>
        ))}
        {isReadyToBattle() && (
          <div>
            <button onClick={handleReadyToBattle}>Ready to Battle</button>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap">{renderSelectedPokemon()}</div>
      <PokemonList
        selectedTeam={selectedTeam}
        handleSelectOrRemove={handleSelectOrRemove}
      />
    </div>
  );
};

export default SelectPokemonPage;
