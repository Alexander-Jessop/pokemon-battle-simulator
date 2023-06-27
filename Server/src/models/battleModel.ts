import mongoose from "mongoose";

const battleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  playerPokemon: { type: Array, required: true },
  computerPokemon: { type: Array, required: true },
  currentPlayer: { type: Number, required: true },
  turn: { type: Number, required: true },
  status: { type: String, required: true },
  winner: { type: Number, required: false },
  log: { type: Array, required: false },
});

const Battle = mongoose.model("Battle", battleSchema);

export default Battle;
