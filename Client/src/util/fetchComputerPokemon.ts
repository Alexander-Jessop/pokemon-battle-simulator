import axios from "axios";

export const fetchComputerSelectedPokemon = async () => {
  const response = await axios.get("/api/battle/computer-pokemon");
  return response.data;
};
