/* eslint-disable no-console */
const express = require('express');
const gameDataFunctions = require('../database/controllers/gameData.js');
// eslint-disable-next-line no-unused-vars
const GameData = require('../database/models/gameData.js');
const db = require('../database/index.js');

const app = express();
const port = 1337;

app.use(express.static('public'));

app.get('/gameData', (req, res) => {
  // gameDataFunctions.getSavedGameData({}, (error, saveData) => {
  //   if (error) {
  //     console.log(error);
  //     res.status(404).send(error);
  //   } else {
  //     console.log(saveData);
  //     res.status(202).send(saveData);
  //   }
  // });
  GameData.find({}, (error, results) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/gameData', (req, res) => {
  const gameData = req.query;
  console.log(gameData);
  gameDataFunctions.saveGameData(gameData, (error, saved) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      res.status(201).send(saved);
    }
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
