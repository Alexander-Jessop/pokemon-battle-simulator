import axios from "axios";

const fetchGameState = async (battleId: string) => {
  try {
    const res = await axios.get(`api/battle/game-state/${battleId}`);
    return res;
  } catch (err) {
    throw new Error("Failed to fetch game state");
  }
};

export default fetchGameState;
