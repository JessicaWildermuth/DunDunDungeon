/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import Player from './Player.jsx';
import Monster from './Monster.jsx';
import Spell from './Spell.jsx';

class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      getLocation, spells, playerLocation, monsters, spellCast, hurt,
    } = this.props;
    return (

      <div className="level">
        <img src="map.png" alt="dungeonFloor" />
        <Player getLocation={getLocation} playerLocation={playerLocation} spellCast={spellCast} hurt={hurt} />
        <Monster getLocation={getLocation} monsters={monsters} />
        {spells.length !== 0 ? <Spell getLocation={getLocation} spells={spells} /> : null}
      </div>
    );
  }
}

export default Level;
