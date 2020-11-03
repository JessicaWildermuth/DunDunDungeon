const GameData = require('../models/gameData.js');

const getSavedGameData = (callback) => {
  GameData.find({}, callback);
};

const saveGameData = (gameData, callback) => {
  const filter = { playerName: gameData.playerName };
  console.log(gameData.spells);
  GameData.findOneAndUpdate(filter, gameData, { new: true, upsert: true }, callback);
};

module.exports = {
  getSavedGameData,
  saveGameData,
};
