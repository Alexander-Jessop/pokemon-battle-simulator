import axios from "axios";

const patchUserSwitchPokemon = async (pokemonId: number, battleId: string) => {
  try {
    const body = { pokemonId, battleId };
    const res = await axios.patch("api/battle/switch-player-pokemon", body);
    return res;
  } catch (err) {
    throw new Error("Failed to patch user switch pokemon");
  }
};

export default patchUserSwitchPokemon;
