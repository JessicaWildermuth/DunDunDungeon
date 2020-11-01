/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
// import axios from 'axios';
import Level from './Level.jsx';
import distanceBetween from './helpers';
import SpellBook from './SpellBook.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerLocation: null,
      monsterLocation: null,
      playerCenter: null,
      monsterCenter: null,
      playerSpells: [],
      spells: [],
    };
    this.getLocation = this.getLocation.bind(this);
    this.checkOverlap = this.checkOverlap.bind(this);
  }

  componentDidMount() {
    const { spells } = this.state;
    const spellTop = Math.floor(Math.random() * (91 - 0) + 0);
    const spellLeft = Math.floor(Math.random() * (91 - 0) + 0);
    const spellLocation = { top: spellTop, left: spellLeft };
    const spellTypes = [{ type: 'nova', dmg: 1 }];
    const randomSpell = spellTypes[Math.floor(Math.random() * Math.floor(spellTypes.length))];
    const updatedSpells = spells;
    updatedSpells.push({type: randomSpell.type, dmg: randomSpell.dmg, center: { top: spellLocation.top + 4, left: spellLocation.left + 4 }, location: spellLocation });
    this.setState({
      spells: updatedSpells,
    });
    const playerTop = Math.floor(Math.random() * (91 - 0) + 0);
    const playerLeft = Math.floor(Math.random() * (91 - 0) + 0);
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
    const { playerCenter, monsterCenter, spells } = this.state;
    if (distanceBetween(playerCenter, monsterCenter) < 7.2) {
      alert('TOUCHING!');
    }
    spells.map((spell) => {
      if (distanceBetween(playerCenter, spell.center) < 7.2) {
        alert('GET SPELL');
        const { playerSpells } = this.state;
        const updatePlayerSpells = playerSpells;
        updatePlayerSpells.push(spell);
        let updatedSpells = spells;
        updatedSpells.splice(spells.indexOf(spell), 1);
        this.setState({
          playerSpells: updatePlayerSpells,
          spells: updatedSpells
        });
      }
    });
  }

  render() {
    const { spells, playerLocation, monsterLocation, playerSpells } = this.state;
    return (
      <div>
        <Level getLocation={this.getLocation} spells={spells} playerLocation={playerLocation} monsterLocation={monsterLocation} />
        {/* <SpellBook playerSpells={playerSpells} /> */}
      </div>
    );
  }
}

export default App;
