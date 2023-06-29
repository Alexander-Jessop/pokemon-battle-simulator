import axios from "axios";

const patchComputerSwitchPokemon = async (battleId: string) => {
  const res = await axios.patch("/api/battle/switch-computer-pokemon", {
    battleId,
  });

  return res.data;
};

export default patchComputerSwitchPokemon;
