import { PokemonType } from "../../types/PokemonType";

interface SelectedBattlePokemonProps {
  pokemon: PokemonType;
  isComputer?: boolean;
  hp: number;
  isLunging?: boolean;
  isComputerLunging?: boolean;
}

const SelectedBattlePokemon = ({
  pokemon,
  isComputer,
  hp,
  isLunging = false,
  isComputerLunging = false,
}: SelectedBattlePokemonProps) => {
  return (
    <div key={pokemon.id}>
      {isComputer && (
        <>
          <p className="text-center text-lg font-bold">{pokemon.name}</p>
          <p>HP: {hp}</p>
        </>
      )}
      <img
        src={pokemon.battleSprite || pokemon.sprite}
        alt={pokemon.name}
        className={`mx-auto h-48 w-48 ${
          isLunging
            ? "animate-lunge-right"
            : isComputerLunging
            ? "animate-lunge-right"
            : ""
        }`}
      />
      {!isComputer && (
        <>
          <p>HP: {hp}</p>
          <p className="text-center text-lg font-bold">{pokemon.name}</p>
        </>
      )}
    </div>
  );
};

export default SelectedBattlePokemon;
