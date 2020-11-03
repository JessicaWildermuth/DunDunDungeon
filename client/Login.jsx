/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlayer: false,
      returningPlayer: false,
      name: '',
      savedGames: null,
    };
    this.selectNewPlayer = this.selectNewPlayer.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.selectName = this.selectName.bind(this);
    this.getSavedGame = this.getSavedGame.bind(this);
    this.selectReturningPlayer = this.selectReturningPlayer.bind(this);
  }

  componentDidMount() {
    const { savedGames } = this.state;
    if (!savedGames) {
      axios({
        method: 'get',
        url: '/gameData',
      })
        .then((response) => {
          this.setState({
            savedGames: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  getSavedGame() {
    const { name, savedGames } = this.state;
    let hasGameData = false;
    let gameData;
    for (let i = 0; i < savedGames.length; i += 1) {
      if (savedGames[i].playerName === name) {
        hasGameData = true;
        gameData = savedGames[i];
      }
    }
    if (hasGameData) {
      console.log('HELLO');
      this.loadGame(gameData);
    }
  }

  selectNewPlayer() {
    this.setState({
      newPlayer: true,
    });
  }

  startNewGame() {
    const { createNewPlayer } = this.props;
    const { name } = this.state;
    createNewPlayer(name);
  }

  selectName() {
    this.setState({
      name: e.target.value,
    });
  }

  selectReturningPlayer() {
    this.setState({
      returningPlayer: true,
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { newPlayer, name, returningPlayer } = this.state;
    return (
      <div id="login">
        <h1 className="login"> WELCOME TO DunDunDungeon Crawler!</h1>
        <button type="button" className="newPlayer" onClick={this.selectNewPlayer}>NEW PLAYER?</button>
        {newPlayer ? (
          <form>
            <label htmlFor="name" className="createPlayer">Enter Player Name</label>
            <input type="text" name="name" id="name" value={name} onChange={this.selectName} required />
            <input type="submit" value="Start Game" className="startGame" onClick={this.startNewGame} />
          </form>
        ) : null}
        <button type="button" className="returningPlayer" onClick={this.selectReturningPlayer}>RETURNING PLAYER?</button>
        {returningPlayer ? (
          <form>
            <label htmlFor="name" className="createPlayer">Enter Player Name</label>
            <input type="text" name="name" id="name" value={name} onChange={this.selectName} required />
            <button type="button" value="Start Game" id="startGame" onClick={this.getSavedGame}>START GAME</button>
          </form>
        ) : null}
      </div>
    );
  }
}

export default Login;
