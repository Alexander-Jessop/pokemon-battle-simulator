import mongoose, { Schema } from "mongoose";
var userSchema = new Schema({
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
var UserModel = mongoose.model("User", userSchema);
export default UserModel;
