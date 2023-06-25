import mongoose from "mongoose";

const battleSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  playerPokemon: { type: Array, required: true },
  computerPokemon: { type: Array, required: true },
  currentPlayer: { type: Number, required: true },
  turn: { type: Number, required: true },
  status: { type: String, required: true },
  winner: { type: Number, required: true },
  log: { type: Array, required: true },
});

const Battle = mongoose.model("Battle", battleSchema);

export default Battle;
