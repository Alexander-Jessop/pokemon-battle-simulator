import axios from "axios";

const patchPokemonAttack = async (
  moveUrl: string,
  battleId: string,
  isPlayer: number
) => {
  try {
    const body = { moveUrl, battleId, isPlayer };
    const res = await axios.patch("api/battle/attack", body);
    return res;
  } catch (err) {
    throw new Error("Failed to patch pokemon attack");
  }
};

export default patchPokemonAttack;
