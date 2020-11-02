/* eslint-disable array-callback-return */
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
      playerCenter: null,
      playerSpells: [],
      spells: [],
      monsters: [],
      playerStats: { level: null, exp: null, health: null },
      dead: false,
      level: 1,
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
    updatedSpells.push({
      type: randomSpell.type, dmg: randomSpell.dmg, center: { top: spellLocation.top + 4, left: spellLocation.left + 4 }, location: spellLocation,
    });
    this.setState({
      spells: updatedSpells,
    });

    const playerTop = Math.floor(Math.random() * (91 - 0) + 0);
    const playerLeft = Math.floor(Math.random() * (91 - 0) + 0);
    const player = { top: playerTop, left: playerLeft };
    const startingPlayerStats = { level: 1, exp: 0 };
    const playerHealth = startingPlayerStats.level * 10;
    startingPlayerStats.health = playerHealth;
    this.setState({
      playerStats: startingPlayerStats,
      playerLocation: player,
      playerCenter: { top: player.top + 4, left: player.left + 4 },
    });

    const { level } = this.state;
    for (let i = 0; i < level; i += 1) {
      const { monsters } = this.state;
      const monsterTop = Math.floor(Math.random() * (91 - 0) + 0);
      const monsterLeft = Math.floor(Math.random() * (96 - 0) + 0);
      const monsterLocation = { top: monsterTop, left: monsterLeft };
      const monsterCenter = { top: monsterTop + 4, left: monsterLeft + 4 };
      const updatedMonsterList = monsters;
      const monsterHealth = 5;
      monsters.push({ location: monsterLocation, center: monsterCenter, health: monsterHealth });
      this.setState({
        monsters: updatedMonsterList,
      });
    }
  }

  getLocation(obj) {
    const center = { top: obj.top + 4, left: obj.left + 4 };
    if (obj.type === 'player') {
      this.setState({
        playerCenter: center,
      });
    } else if (obj.type === 'monster') {
      const { monsters } = this.state;
      const newMonsterList = monsters;
      newMonsterList[obj.index].center = center;
      this.setState({
        monsters: newMonsterList,
      });
    }
    this.checkOverlap();
  }

  // checkSpellHit() {
  //   const { playerCenter, monsters} = this.state;
  //   for (let i = 0; i < monsters.length; i += 1) {
  //     let monster = monsters[i];
  //     if (distanceBetween(playerCenter, monster.center))
  //   }
  // }

  checkOverlap() {
    const {
      playerCenter, spells, playerStats, monsters,
    } = this.state;
    spells.map((spell) => {
      if (distanceBetween(playerCenter, spell.center) < 7.2) {
        const { playerSpells } = this.state;
        const updatePlayerSpells = playerSpells;
        updatePlayerSpells.push(spell);
        const updatedSpells = spells;
        updatedSpells.splice(spells.indexOf(spell), 1);
        this.setState({
          playerSpells: updatePlayerSpells,
          spells: updatedSpells,
        });
      }
    });

    for (let i = 0; i < monsters.length; i += 1) {
      const monster = monsters[i];
      if (distanceBetween(playerCenter, monster.center) < 7.2) {
        const updatePlayerHealth = playerStats.health - 1;
        const updatedPlayerStats = { level: playerStats.level, exp: playerStats.exp, health: updatePlayerHealth };
        this.setState({
          playerStats: updatedPlayerStats,
        }, () => {
          if (playerStats.health === 0) {
            this.setState({
              dead: true,
            });
          }
        });
      }
    }
  }

  render() {
    const {
      spells, playerLocation, playerSpells, dead, monsters,
    } = this.state;
    if (!dead) {
      return (
        <div>
          <Level getLocation={this.getLocation} spells={spells} playerLocation={playerLocation} monsters={monsters} />
          <SpellBook playerSpells={playerSpells} />
        </div>
      );
    }
    return <div className="dead">YOU HAVE DIED</div>;
  }
}

export default App;
