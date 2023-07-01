import { ISelPokeType } from "../../types/PokemonType";
import PokemonGrid from "./PokemonSelectionGrid";

interface SelectedPokemonSectionProps {
  selectedTeam: ISelPokeType[];
  handleSelectOrRemove: (pokemon: ISelPokeType) => void;
  removeAllPokemon: () => void;
  isReadyToBattle: () => boolean;
  onReadyToBattle: () => void;
}

const SelectedPokemonSection = ({
  selectedTeam,
  handleSelectOrRemove,
  removeAllPokemon,
  isReadyToBattle,
  onReadyToBattle,
}: SelectedPokemonSectionProps) => {
  if (selectedTeam.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-8xl py-6">
      <h2 className="mb-4 text-center text-2xl font-semibold text-white">
        Selected Pokemon:
      </h2>
      <PokemonGrid
        selectedTeam={selectedTeam}
        handleSelectOrRemove={handleSelectOrRemove}
      />
      <div className="mt-4 flex justify-center">
        <button
          className="mr-2 rounded bg-red-500 px-4 py-2
              text-white hover:bg-red-600"
          onClick={removeAllPokemon}
        >
          Remove All
        </button>
        {isReadyToBattle() && (
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white
              hover:bg-blue-600"
            onClick={onReadyToBattle}
          >
            Ready to Battle
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectedPokemonSection;
