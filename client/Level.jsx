/* eslint-disable import/extensions */
import React from 'react';
import Player from './Player.jsx';
import Monster from './Monster.jsx';

class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="level">
        <Player />
        <Monster />
      </div>
    );
  }
}

export default Level;
