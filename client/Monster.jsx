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
      const { getLocation, monsters } = this.props;
      const index = Math.floor(Math.random() * Math.floor(directions.length));
      const randomDirection = directions[index];
      for (let i = 0; i < monsters.length; i += 1) {
        const theMonster = monsters[i];
        if (randomDirection === 'top') {
          if (theMonster.location.top === 0 || theMonster.location.top === 1.5 || theMonster.location.top === 1) {
            theMonster.location.top = 0;
          } else {
            theMonster.location.top -= 2;
          }
        } else if (randomDirection === 'bottom') {
          if (theMonster.location.top === 90 || theMonster.location.top === 91.5 || theMonster.location.top === 91 || theMonster.location.top === 90.5) {
            theMonster.location.top = 91.5;
          } else {
            theMonster.location.top += 2;
          }
        } else if (randomDirection === 'right') {
          if (theMonster.location.left === 0 || theMonster.location.left === 1 || theMonster.location.left === 1.5) {
            theMonster.location.left = 0;
          } else {
            theMonster.location.left -= 2;
          }
        } else if (randomDirection === 'left') {
          if (theMonster.location.left === 91.5 || theMonster.location.left === 91 || theMonster.location.left === 90) {
            theMonster.location.left = 91.5;
          } else {
            theMonster.location.left += 2;
          }
        }
        getLocation({
          type: 'monster', top: theMonster.location.top, left: theMonster.location.left, index: i,
        });
      }
    }, 200);
  }

  componentWillUnmount() {
    if (this.monsterMovementInterval) clearInterval(this.monsterMovementInterval);
  }

  render() {
    const { monsters } = this.props;
    return monsters.map((monster) => {
      const location = { top: `${monster.location.top}%`, left: `${monster.location.left}%` };
      return <div className="monster" style={location} />;
    });
  }
}

export default Monster;
