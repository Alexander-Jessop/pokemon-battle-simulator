import { PokemonType } from "../types/PokemonType";

interface SwitchMenuProps {
  selectedTeam: PokemonType[];
  switchPokemon: (index: number) => void;
  closeSwitchMenu: () => void;
}

const SwitchMenu = ({
  selectedTeam,
  switchPokemon,
  closeSwitchMenu,
}: SwitchMenuProps) => (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black
  bg-opacity-50"
  >
    <div className="w-1/3 rounded-lg bg-white p-4 shadow-lg">
      <h2 className="mb-4 text-lg font-bold">Pokemon:</h2>
      <ul>
        {selectedTeam.map((pokemon, index) => (
          <li
            key={pokemon.id}
            className="flex items-center justify-between border-b
              border-gray-200 py-2"
          >
            <span>{pokemon.name}</span>
            <button
              onClick={() => {
                switchPokemon(index);
                closeSwitchMenu();
              }}
              className={`ml-2 rounded px-4 py-2 ${
                pokemon.isInBattle ? "bg-gray-400" : "bg-secondary-500"
              } text-white hover:bg-secondary-600`}
              disabled={pokemon.isInBattle}
            >
              {pokemon.isInBattle ? "Active" : "Switch"}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={closeSwitchMenu}
        className="mt-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        Close
      </button>
    </div>
  </div>
);

export default SwitchMenu;
