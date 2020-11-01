/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
// import axios from 'axios';
import Level from './Level.jsx';
import distanceBetween from './helpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerLocation: null,
      monsterLocation: null,
      spellLocation: null,
      playerCenter: null,
      monsterCenter: null,
      spellCenter: null,
    };
    this.getLocation = this.getLocation.bind(this);
    this.checkOverlap = this.checkOverlap.bind(this);
  }

  componentDidMount() {
    const spellTop = Math.floor(Math.random() * (91 - 0) + 0);
    const spellLeft = Math.floor(Math.random() * (96 - 0) + 0);
    const spell = { top: spellTop, left: spellLeft };
    this.setState({
      spellLocation: spell,
      spellCenter: { top: spell.top + 4, left: spell.left + 4 },
    });
    const playerTop = Math.floor(Math.random() * (91 - 0) + 0);
    const playerLeft = Math.floor(Math.random() * (96 - 0) + 0);
    const player = { top: playerTop, left: playerLeft };
    this.setState({
      playerLocation: player,
      playerCenter: { top: player.top + 4, left: player.left + 4 },
    });
    const monsterTop = Math.floor(Math.random() * (91 - 0) + 0);
    const monsterLeft = Math.floor(Math.random() * (96 - 0) + 0);
    const monster = { top: monsterTop, left: monsterLeft };
    this.setState({
      monsterLocation: monster,
      monsterCenter: { top: monster.top + 4, left: monster.left + 4 },
    });
  }

  getLocation(obj) {
    const center = { top: obj.top + 4, left: obj.left + 4 };
    if (obj.type === 'player') {
      this.setState({
        playerCenter: center,
      });
    } else if (obj.type === 'monster') {
      this.setState({
        monsterCenter: center,
      });
    }
    this.checkOverlap();
  }

  checkOverlap() {
    const { playerCenter, monsterCenter, spellCenter } = this.state;
    if (distanceBetween(playerCenter, monsterCenter) < 8) {
      alert('TOUCHING!');
    }
    if (distanceBetween(playerCenter, spellCenter) < 8) {
      alert('GET SPELL');
      this.setState({
        spellCenter: null,
        spellLocation: null,
      });
    }
  }

  render() {
    const { spellLocation, playerLocation, monsterLocation } = this.state;
    return (
      <div>
        <Level getLocation={this.getLocation} spellLocation={spellLocation} playerLocation={playerLocation} monsterLocation={monsterLocation} />
      </div>
    );
  }
}

export default App;
