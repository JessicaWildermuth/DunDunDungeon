/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import { Howl } from 'howler';
import Level from './Level.jsx';
import distanceBetween from './helpers';
import SpellBook from './SpellBook.jsx';
import Login from './Login.jsx';
import JukeBox from './JukeBox.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerLocation: null,
      playerCenter: null,
      playerSpells: [],
      spells: [],
      monsters: [],
      playerStats: {
        level: null, exp: null, health: null, name: null,
      },
      dead: false,
      level: 1,
      spellCast: false,
      musicList: [{ title: 'LostWoods', src: 'LostWoods.mp3' }, { title: 'Memoraphile', src: 'memoraphile.mp3' }, { title: 'FrogTheme', src: 'FrogTheme.mp3' }, { title: 'MetalMix', src: 'MetalMix.mp3' }],
      hurt: false,
    };
    this.getLocation = this.getLocation.bind(this);
    this.checkOverlap = this.checkOverlap.bind(this);
    this.checkSpellHit = this.checkSpellHit.bind(this);
    this.endSpellCast = this.endSpellCast.bind(this);
    this.createNewPlayer = this.createNewPlayer.bind(this);
    this.loadGame = this.loadGame.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.resetBlood = this.resetBlood.bind(this);
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

    const { level } = this.state;
    for (let i = 0; i < level + 4; i += 1) {
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

  loadGame(gameData) {
    const playerTop = Math.floor(Math.random() * (91 - 0) + 0);
    const playerLeft = Math.floor(Math.random() * (91 - 0) + 0);
    const player = { top: playerTop, left: playerLeft };
    const playerStats = JSON.parse(gameData.playerStats);
    const playerSpells = [];
    for (let i = 0; i < gameData.spells.length; i += 1) {
      playerSpells.push(JSON.parse(gameData.spells[i]));
    }
    this.setState({
      playerLocation: player,
      playerCenter: { top: player.top + 4, left: player.left + 4 },
      playerStats,
      playerSpells,
    });
  }

  saveGame() {
    const { playerStats, playerSpells } = this.state;
    const spells = [];
    for (let i = 0; i < playerSpells.length; i += 1) {
      const spell = { type: playerSpells[i].type, dmg: playerSpells[i].dmg };
      spells.push(spell);
    }
    axios({
      method: 'post',
      url: '/gameData',
      params: {
        playerName: playerStats.name,
        playerStats,
        spells,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createNewPlayer(playerName) {
    const playerTop = Math.floor(Math.random() * (91 - 0) + 0);
    const playerLeft = Math.floor(Math.random() * (91 - 0) + 0);
    const player = { top: playerTop, left: playerLeft };
    const startingPlayerStats = { level: 1, exp: 0, name: playerName };
    const playerHealth = startingPlayerStats.level * 10;
    startingPlayerStats.health = playerHealth;
    this.setState({
      playerStats: startingPlayerStats,
      playerLocation: player,
      playerCenter: { top: player.top + 4, left: player.left + 4 },
    });
  }

  checkSpellHit(spellName) {
    console.log(spellName);
    const sound = new Howl({
      src: 'nova3.mp3',
    });
    sound.play();
    this.setState({
      spellCast: true,
    }, this.endSpellCast);
    const { playerCenter, monsters, playerSpells } = this.state;
    let spellDmg;
    for (let i = 0; i < playerSpells.length; i += 1) {
      const spell = playerSpells[i];
      if (spell.type === spellName) {
        spellDmg = spell.dmg;
        break;
      }
    }
    for (let i = 0; i < monsters.length; i += 1) {
      const monster = monsters[i];
      if (distanceBetween(playerCenter, monster.center) < 11) {
        monster.health -= spellDmg;
        if (monster.health === 0) {
          const updatedMonsterList = monsters;
          updatedMonsterList.splice(i, 1);
          this.setState({
            monsters: updatedMonsterList,
          });
        }
      }
    }
  }

  endSpellCast() {
    setTimeout(() => {
      this.setState({
        spellCast: false,
      });
    }, 500);
  }

  resetBlood() {
    setTimeout(() => {
      this.setState({
        hurt: false,
      });
    }, 500);
  }

  checkOverlap() {
    const {
      playerCenter, spells, playerStats, monsters,
    } = this.state;
    spells.map((spell) => {
      if (distanceBetween(playerCenter, spell.center) < 4) {
        const { playerSpells } = this.state;
        let spellAlreadyLearnt = false;
        for (let i = 0; i < playerSpells.length; i += 1) {
          const knownSpell = playerSpells[i];
          if (knownSpell.type === spell.type) {
            spellAlreadyLearnt = true;
            break;
          }
        }
        if (!spellAlreadyLearnt) {
          const updatePlayerSpells = playerSpells;
          const newSpell = { type: spell.type, dmg: spell.dmg };
          updatePlayerSpells.push(newSpell);
          const updatedSpells = spells;
          updatedSpells.splice(spells.indexOf(spell), 1);
          this.setState({
            playerSpells: updatePlayerSpells,
            spells: updatedSpells,
          });
        } else {
          alert('Spell Already Learnt');
          const updatedSpells = spells;
          updatedSpells.splice(spells.indexOf(spell), 1);
          this.setState({
            spells: updatedSpells,
          });
        }
      }
    });

    for (let i = 0; i < monsters.length; i += 1) {
      const monster = monsters[i];
      if (distanceBetween(playerCenter, monster.center) < 5) {
        const updatePlayerHealth = playerStats.health - 0.5; // CHANGE BACK TO -0.5
        const updatedPlayerStats = {
          level: playerStats.level, exp: playerStats.exp, health: updatePlayerHealth, name: playerStats.name,
        };
        this.setState({
          playerStats: updatedPlayerStats,
          hurt: true,
        }, () => {
          if (playerStats.health === 0) {
            this.setState({
              dead: true,
            });
          }
          this.resetBlood();
        });
      }
    }
  }

  render() {
    const {
      spells, playerLocation, playerSpells, dead, monsters, playerStats, spellCast, musicList, hurt,
    } = this.state;
    if (!dead && playerStats.name) {
      return (
        <div>
          <h1> DunDunDungeon Crawler</h1>
          <Level getLocation={this.getLocation} spells={spells} playerLocation={playerLocation} monsters={monsters} spellCast={spellCast} hurt={hurt} />
          <SpellBook playerSpells={playerSpells} checkSpellHit={this.checkSpellHit} />
          <div id="playerStatContainer">
            <img id="statsContainer" src="buttonNormalSmaller.png" alt="playerStatsContainer" />
            <div id="playerStats" className="playerLevel">
              Level
              {'\n'}
              {'   '}
              {playerStats.level}
            </div>
            <div id="playerStats" className="playerExp">
              Experience
              {'\n'}
              {'         '}
              {playerStats.exp}
            </div>
            <div id="playerStats" className="playerHealth">
              Health
              {'\n'}
              {'    '}
              {playerStats.health}
            </div>
          </div>
          <div id="save">
            <button type="button" className="save" onClick={this.saveGame}>SAVE GAME</button>
          </div>
          <JukeBox musicList={musicList} />
        </div>
      );
    } if (dead) {
      return <div className="dead">YOU HAVE DIED</div>;
    }
    return <Login createNewPlayer={this.createNewPlayer} loadGame={this.loadGame} />;
  }
}

export default App;
