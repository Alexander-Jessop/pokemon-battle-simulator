import PokemonCard from "./PokemonCard";
import { ISelPokeType } from "../../types/PokemonType";

interface PokemonGridProps {
  selectedTeam: ISelPokeType[];
  handleSelectOrRemove: (pokemon: ISelPokeType) => void;
}

const PokemonGrid = ({
  selectedTeam,
  handleSelectOrRemove,
}: PokemonGridProps) => {
  return (
    <div
      className="grid grid-cols-1 justify-items-center gap-4
      md:grid-cols-2 lg:grid-cols-3"
    >
      {selectedTeam.map((pokemon: ISelPokeType) => (
        <div key={pokemon.id}>
          <PokemonCard
            pokemon={pokemon}
            onSelect={() => handleSelectOrRemove(pokemon)}
            isSelected={true}
          />
        </div>
      ))}
    </div>
  );
};

export default PokemonGrid;
