/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';

class Monster extends React.Component {
  constructor(props) {
    super(props);
    this.monsterMovementInterval = null;
    this.state = {

    };
  }

  componentDidMount() {
    const directions = ['top', 'left', 'bottom', 'right'];
    this.monsterMovementInterval = setInterval(() => {
      const { monsterLocation, getLocation } = this.props;
      const index = Math.floor(Math.random() * Math.floor(directions.length));
      const randomDirection = directions[index];
      if (randomDirection === 'top') {
        if (monsterLocation.top === 0 || monsterLocation.top === 1.5 || monsterLocation.top === 1) {
          monsterLocation.top = 0;
        } else {
          monsterLocation.top -= 2;
        }
      } else if (randomDirection === 'bottom') {
        if (monsterLocation.top === 90 || monsterLocation.top === 91.5 || monsterLocation.top === 91) {
          monsterLocation.top = 91.5;
        } else {
          monsterLocation.top += 2;
        }
      } else if (randomDirection === 'right') {
        if (monsterLocation.left === 0 || monsterLocation.left === 1 || monsterLocation.left === 1.5) {
          monsterLocation.left = 0;
        } else {
          monsterLocation.left -= 2;
        }
      } else if (randomDirection === 'left') {
        if (monsterLocation.left === 91.5 || monsterLocation.left === 91 || monsterLocation.left === 90) {
          monsterLocation.left = 91.5;
        } else {
          monsterLocation.left += 2;
        }
      }
      getLocation({ type: 'monster', top: monsterLocation.top, left: monsterLocation.left });
    }, 200);
  }

  componentWillUnmount() {
    if (this.monsterMovementInterval) clearInterval(this.monsterMovementInterval);
  }

  render() {
    const { monsterLocation } = this.props;
    if (monsterLocation !== null) {
      const location = { top: `${monsterLocation.top}%`, left: `${monsterLocation.left}%` };
      return <div className="monster" style={location} />;
    }
    return null;
  }
}

export default Monster;
