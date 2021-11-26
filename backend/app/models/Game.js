mongoose = require("mongoose");

const GameSchema = new mongoose.GameSchema({
  users: [
    {
      userId: { type: String, required: true },
      score: { type: Number, required: true },
      wpm: { type: Number, required: true },
    },
  ],
});

const Game = mongoose.model("game", GameSchema);

export default Game;
