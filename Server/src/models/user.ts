import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  visits: number;
  battlesPlayed: number;
  movesUsed: number;
  gamesWon: number;
  gamesLost: number;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  visits: {
    type: Number,
    default: 0,
  },
  battlesPlayed: {
    type: Number,
    default: 0,
  },
  movesUsed: {
    type: Number,
    default: 0,
  },
  gamesWon: {
    type: Number,
    default: 0,
  },
  gamesLost: {
    type: Number,
    default: 0,
  },
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
