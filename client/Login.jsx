/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlayer: false,
      returningPlayer: false,
      name: '',
    };
    this.selectNewPlayer = this.selectNewPlayer.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.selectName = this.selectName.bind(this);
  }

  selectNewPlayer(e) {
    this.setState({
      newPlayer: true,
    });
  }

  startNewGame(e) {
    const { createNewPlayer } = this.props;
    const { name } = this.state;
    createNewPlayer(name);
  }

  selectName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { newPlayer, name } = this.state;
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
        <button type="button" className="returningPlayer">RETURNING PLAYER?</button>
      </div>
    );
  }
}

export default Login;
