import axios from "axios";

export const fetchUserSwitchPokemon = async (): Promise<void> => {
  try {
    const response = await axios.get("/api/battle/switch-player-pokemon");
    const pokemonList = response.data;

    return pokemonList;
  } catch (error) {
    console.error("Failed to fetch Pokemon list:", error);
  }
};
