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
      getLocation, spellLocation, playerLocation, monsterLocation,
    } = this.props;
    return (

      <div className="level">
        <Player getLocation={getLocation} playerLocation={playerLocation} />
        <Monster getLocation={getLocation} monsterLocation={monsterLocation} />
        <Spell getLocation={getLocation} spellLocation={spellLocation} />
      </div>
    );
  }
}

export default Level;
