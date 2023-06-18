import axios from "axios";

export const fetchUserSwitchPokemon = async (): Promise<void> => {
  try {
    const response = await axios.get("/api/battle/switch-player-pokemon");
    const pokemonList = response.data;
    // Handle the fetched Pokemon list as needed
    console.log("Fetched Pokemon list:", pokemonList);
  } catch (error) {
    console.error("Failed to fetch Pokemon list:", error);
  }
};
