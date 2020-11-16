/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import { Howl, Howler } from 'howler';
import Level from './Level.jsx';
import distanceBetween from './helpers';
import SpellBook from './SpellBook.jsx';
import Login from './Login.jsx';
import JukeBox from './JukeBox.jsx';
import Winner from './Winner.jsx';
import Death from './Death.jsx';

class GameObject {
  constructor(topOffset, leftOffset) {
    const top = Math.floor(Math.random() * (91 - 0) + 0);
    const left = Math.floor(Math.random() * (96 - 0) + 0);
    this.location = {top, left}
    this.topOffset = topOffset;
    this.leftOffset = leftOffset;
    this.center = {top: top + topOffset, left: left + leftOffset};
  }

  updateCenter() {
    this.center.top = this.location.top + this.topOffset;
    this.center.left = this.location.left + this.leftOffset;
  }
}

class Spell extends GameObject {
  constructor() {
    const topOffset = 4;
    const leftOffset = 4;
    super(topOffset, leftOffset);
    this.type = 'nova';
    this.dmg = 1;
  }
}

class Character extends GameObject {
  constructor(topOffset, leftOffset, health, redraw) {
    super(topOffset, leftOffset);
    this.health = health;
    this.redraw = redraw;
  }

  move(direction) {
    if (direction === 'up') this.location.top -= 2;
    if (direction === 'down') this.location.top += 2;
    if (direction === 'left') this.location.left -= 2;
    if (direction === 'right') this.location.left += 2;
    this.correctOutOfBounds();
    this.updateCenter();
    this.redraw();
  }

  correctOutOfBounds() {
    if (this.location.top < 0) this.location.top = 0;
    if (this.location.top > 91.5) this.location.top = 91.5;
    if (this.location.left < 0) this.location.left = 0;
    if (this.location.left > 91.5) this.location.left = 91.5;
  }
}

class Monster extends Character {
  constructor(redraw) {
    const monsterTop = Math.floor(Math.random() * (91 - 0) + 0);
    const monsterLeft = Math.floor(Math.random() * (96 - 0) + 0);
    const TOP_OFFSET = 4;
    const LEFT_OFFSET = 4;
    const health = 5;
    super(TOP_OFFSET, LEFT_OFFSET, health, redraw);
    this.movementInterval = this.createAutoMove();
  }

  createAutoMove() {
    const directions = ['left', 'right', 'up', 'down'];
    return setInterval(() => {
      const index = Math.floor(Math.random() * Math.floor(directions.length));
      this.move(directions[index]);
    }, 100)
  }

  die() {
    clearInterval(this.movementInterval);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerLocation: null,
      playerCenter: null,
      playerSpells: [],
      spells: [new Spell()],
      monsters: [],
      playerStats: {
        level: null, exp: null, health: null, name: null,
      },
      dead: false,
      level: 1,
      spellCast: false,
      musicList: [{ title: 'Lost Woods', src: 'LostWoods.mp3', id: 'LostWoods' }, { title: 'Memoraphile', src: 'memoraphile.mp3', id: 'Memoraphile' }, { title: 'Frog Theme', src: 'Frog Theme.mp3', id: 'FrogTheme' }, { title: 'Metal Mix', src: 'MetalMix.mp3', id: 'MetalMix' }, { title: 'Eric\'s Request', src: 'Chocobo.mp3', id: 'Chocobo' }],
      hurt: false,
      win: false,
      // currentSong: null,
    };
    this.getLocation = this.getLocation.bind(this);
    this.checkOverlap = this.checkOverlap.bind(this);
    this.checkSpellHit = this.checkSpellHit.bind(this);
    this.endSpellCast = this.endSpellCast.bind(this);
    this.createNewPlayer = this.createNewPlayer.bind(this);
    this.loadGame = this.loadGame.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.resetBlood = this.resetBlood.bind(this);
    this.playSong = this.playSong.bind(this);
    this.redrawMonsters = this.redrawMonsters.bind(this);
  }

  componentDidMount() {
    // const { spells } = this.state;
    // const spellTop = Math.floor(Math.random() * (91 - 0) + 0);
    // const spellLeft = Math.floor(Math.random() * (91 - 0) + 0);
    // const spellLocation = { top: spellTop, left: spellLeft };
    // const spellTypes = [{ type: 'nova', dmg: 1 }];
    // const randomSpell = spellTypes[Math.floor(Math.random() * Math.floor(spellTypes.length))];
    // const updatedSpells = spells;
    // updatedSpells.push({
    //   type: randomSpell.type, dmg: randomSpell.dmg, center: { top: spellLocation.top + 4, left: spellLocation.left + 4 }, location: spellLocation,
    // });
    // this.setState({
    //   spells: updatedSpells,
    // });

    const { level } = this.state;
    const monsters = [];
    for (let i = 0; i < level + 4; i += 1) {
      monsters.push(new Monster(this.redrawMonsters));
    }
    this.setState({
      monsters: monsters,
    });
  }

  getLocation(obj) {
    const center = { top: obj.top + 4, left: obj.left + 4 };
    if (obj.type === 'player') {
      this.setState({
        playerCenter: center,
      });
    }
    // else {
    //   const { monsters } = this.state;
    //   const newMonsterList = monsters;
    //   newMonsterList[obj.index].center = center;
    //   this.setState({
    //     monsters: newMonsterList,
    //   });
    // }
    this.checkOverlap();
  }

  redrawMonsters() {
    const monsters = [...this.state.monsters];
    this.setState({monsters});
    this.checkOverlap();
  };

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
    const sound = new Howl({
      src: 'nova3.mp3',
    });
    sound.play();
    this.setState({
      spellCast: true,
    }, this.endSpellCast);
    const {
      playerCenter, monsters, playerSpells, playerStats,
    } = this.state;
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
          const updatedPlayerStats = playerStats;
          updatedPlayerStats.exp += 10;
          const updatedMonsterList = monsters;
          updatedMonsterList.splice(i, 1);
          if (updatedMonsterList.length === 0) {
            this.setState({
              win: true,
            });
          }
          this.setState({
            monsters: updatedMonsterList,
            playerStats: updatedPlayerStats,
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
        const sound = new Howl({
          src: 'dmg.mp3',
        });
        sound.play();
        const updatePlayerHealth = playerStats.health - 0.5; // CHANGE BACK TO -0.5
        const updatedPlayerStats = {
          level: playerStats.level, exp: playerStats.exp, health: updatePlayerHealth, name: playerStats.name,
        };
        this.setState({
          playerStats: updatedPlayerStats,
          hurt: true,
        }, () => {
          console.log(playerStats.health);
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

  playSong(e) {
    const { currentSong } = this.state;
    if (currentSong) {
      Howler.stop();
    }
    const song = `${e.target.className}.mp3`;
    const sound = new Howl({
      src: song,
    });
    this.setState({
      currentSong: song,
    });
    sound.play();
  }

  render() {
    const {
      spells, playerLocation, playerSpells, dead, monsters, playerStats, spellCast, musicList, hurt, win, currentSong,
    } = this.state;
    if (!dead && playerStats.name && !win) {
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
            <button type="button" id="hover" className="save" onClick={this.saveGame}>SAVE GAME</button>
          </div>
          <JukeBox musicList={musicList} playSong={this.playSong} />
        </div>
      );
    } if (dead) {
      return (
        <Death currentSong={currentSong} />
      );
    } if (win) {
      return (
        <Winner currentSong={currentSong} />
      );
    }
    return <Login createNewPlayer={this.createNewPlayer} loadGame={this.loadGame} />;
  }
}

export default App;
