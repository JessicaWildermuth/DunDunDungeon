/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.move = this.move.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      let direction;
      if (e.keyCode === 38) {
        direction = 'top';
      } else if (e.keyCode === 39) {
        direction = 'left';
      } else if (e.keyCode === 37) {
        direction = 'right';
      } else if (e.keyCode === 40) {
        direction = 'bottom';
      }
      this.move(direction);
    });
  }

  move(direction) {
    const { playerLocation, getLocation } = this.props;
    if (direction === 'top') {
      if (playerLocation.top === 0 || playerLocation.top === 1.5 || playerLocation.top === 1) {
        playerLocation.top = 0;
      } else {
        playerLocation.top -= 2;
      }
    } else if (direction === 'bottom') {
      if (playerLocation.top === 90 || playerLocation.top === 91.5 || playerLocation.top === 91) {
        playerLocation.top = 91.5;
      } else {
        playerLocation.top += 2;
      }
    } else if (direction === 'right') {
      if (playerLocation.left === 0 || playerLocation.left === 1 || playerLocation.left === 1.5) {
        playerLocation.left = 0;
      } else {
        playerLocation.left -= 2;
      }
    } else if (direction === 'left') {
      if (playerLocation.left === 91.5 || playerLocation.left === 91 || playerLocation.left === 90) {
        playerLocation.left = 91.5;
      } else {
        playerLocation.left += 2;
      }
    }
    getLocation({ type: 'player', top: playerLocation.top, left: playerLocation.left });
  }

  render() {
    const { playerLocation, spellCast, hurt } = this.props;
    if (playerLocation !== null) {
      const location = { top: `${playerLocation.top}%`, left: `${playerLocation.left}%` };
      return (
        <div className="player" style={location}>
          {' '}
          <img src="wizard.gif" alt="wizardPlayer" />
          { hurt ? (
            <img id="blood" src="blood.png" alt="hurt" />
          ) : null}
          { spellCast ? (
            <img id="nova" src="lightCast_96.gif" alt="novaCast" />
          ) : null}
        </div>
      );
    }
    return null;
  }
}

export default Player;
