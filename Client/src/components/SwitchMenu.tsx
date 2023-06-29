import { IBattleData } from "../types/ApiType";
import patchUserSwitchPokemon from "../util/patchUserSwitchPokemon";
import { useGameState } from "../context/GameStateContext";
import fetchGameState from "../util/fetchGameState";

interface SwitchMenuProps {
  pokeData: IBattleData;
  toggleMenu: () => void;
}

const SwitchMenu = ({
  pokeData: { playerPokemon, id },
  toggleMenu,
}: SwitchMenuProps) => {
  const { setGameState } = useGameState();

  const isInBattleAndFainted = playerPokemon.some(
    (pokemon) => pokemon.isInBattle && pokemon.isFainted
  );

  const availablePokemon = playerPokemon.filter(
    (pokemon) => !pokemon.isInBattle
  );

  const switchPokemon = async (pokemonId: number, battleId: string) => {
    try {
      await patchUserSwitchPokemon(pokemonId, battleId);
      toggleMenu();

      const response = await fetchGameState(battleId);
      const updatedGameState = response.data;

      setGameState(updatedGameState);
    } catch (error) {
      throw new Error("Failed to switch pokemon");
    }
  };

  const closeSwitchMenu = () => {
    if (!isInBattleAndFainted) {
      toggleMenu();
    }
  };

  return (
    <div
      className={`${
        availablePokemon.length > 0 ? "" : "hidden"
      } fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="w-1/3 rounded-lg bg-white p-4 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Pokemon:</h2>
        <ul>
          {availablePokemon.map((pokemon) => (
            <li
              key={pokemon.id}
              className="flex items-center justify-between border-b
              border-gray-200 py-2"
            >
              <span className="capitalize">{pokemon.name}</span>
              <button
                onClick={() => switchPokemon(pokemon.id, id)}
                className={`ml-2 rounded bg-secondary-500 px-4 py-2
                text-white hover:bg-secondary-600 ${
                  pokemon.isFainted ? "cursor-not-allowed" : ""
                }`}
                disabled={pokemon.isFainted}
              >
                {pokemon.isFainted ? (
                  <span className="text-red-500">Fainted</span>
                ) : (
                  "Switch"
                )}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={closeSwitchMenu}
          className={`mt-4 rounded bg-gray-500 px-4 py-2 text-white
          hover:bg-gray-600 ${
            isInBattleAndFainted ? "cursor-not-allowed" : ""
          }`}
          disabled={isInBattleAndFainted}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SwitchMenu;
