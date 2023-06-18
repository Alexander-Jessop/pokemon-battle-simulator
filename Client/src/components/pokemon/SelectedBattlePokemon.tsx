import { PokemonType } from "../../types/PokemonType";

interface SelectedBattlePokemonProps {
  pokemon: PokemonType;
}

const SelectedBattlePokemon = ({ pokemon }: SelectedBattlePokemonProps) => (
  <div key={pokemon.id}>
    <img src={pokemon.battleSprite} alt={pokemon.name} />
    <p>{pokemon.name}</p>
  </div>
);

export default SelectedBattlePokemon;
