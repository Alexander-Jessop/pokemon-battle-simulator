import { IPokeDetails } from "../../types/PokemonType";

interface SelectedBattlePokemonProps {
  pokeData: IPokeDetails[];
  isLunging?: boolean;
  isComputerLunging?: boolean;
  isComputer?: boolean;
}

const SelectedBattlePokemon = ({
  pokeData,
  isLunging = false,
  isComputerLunging = false,
  isComputer,
}: SelectedBattlePokemonProps) => {
  const filteredPokemon = pokeData.filter((pokemon) => pokemon.isInBattle);

  return (
    <div className="w-full">
      {filteredPokemon.map((pokemon) => {
        const hpStat = pokemon.stats.find((stat) => stat.stat.name === "hp");
        const baseHP = hpStat?.base_stat ?? 0;
        const currentHP = baseHP - pokemon.damage;
        const healthPercentage = (currentHP / baseHP) * 100;

        let healthColor;
        if (healthPercentage >= 65) {
          healthColor = "bg-green-500";
        } else if (healthPercentage >= 32.5) {
          healthColor = "bg-yellow-500";
        } else {
          healthColor = "bg-red-500";
        }

        return (
          <div key={pokemon.id}>
            {isComputer && (
              <div className="flex w-full justify-end">
                <div className="mr-2">
                  <div className="min-w-[100px] rounded-lg bg-gray-200 p-2">
                    <p
                      className="text-right text-lg font-bold
                    uppercase"
                    >
                      {pokemon.name}
                    </p>
                    <div className="flex items-center">
                      <div
                        className={`h-3 w-48 ${healthColor} border border-black`}
                        style={{ width: `${healthPercentage}%` }}
                      />
                      <p className="ml-2">{currentHP}</p>
                    </div>
                  </div>
                </div>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className={`h-48 w-48 ${
                    isLunging || isComputerLunging ? "animate-lunge-right" : ""
                  }`}
                />
              </div>
            )}
            {!isComputer && (
              <div className="flex justify-start">
                <img
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  className={`h-48 w-48 ${
                    isLunging || isComputerLunging ? "animate-lunge-right" : ""
                  }`}
                />
                <div className="ml-2 flex items-center">
                  <div
                    className="flex min-w-[100px] flex-col rounded-lg
                  bg-gray-200 p-2"
                  >
                    <p className="text-lg font-bold uppercase">
                      {pokemon.name}
                    </p>
                    <div className="flex items-center">
                      <p>{currentHP}</p>
                      <div
                        className={`ml-2 h-3 w-48 ${healthColor}
                        border border-black`}
                        style={{ width: `${healthPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SelectedBattlePokemon;
