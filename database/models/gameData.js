const mongoose = require('mongoose');

const gameDataSchema = mongoose.Schema({
  playerName: String,
  playerStats: {
    level: Number, exp: Number, health: Number, name: String,
  },
  spells: [{ type: String, dmg: Number }],
});

const GameData = mongoose.model('GameData', gameDataSchema);

module.exports = GameData;