import axios from "axios";

export const deleteGameStateData = async (gameId: string) => {
  try {
    const response = await axios.delete(`api/battle/game-state/${gameId}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
