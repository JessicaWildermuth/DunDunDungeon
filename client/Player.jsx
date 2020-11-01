import React from 'react';
import distanceBetween from './helpers';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 10,
      left: 50,
    };
    this.move = this.move.bind(this);
    this.getCenter = this.getCenter.bind(this);
  }

  componentDidMount() {
    const top = Math.floor(Math.random() * (91 - 0) + 0);
    const left = Math.floor(Math.random() * (96 - 0) + 0);
    this.setState({
      top,
      left,
    });
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

  getCenter() {
    const { top, left } = this.state;
    const center = { top: top + 4, left: left + 4 };
    return center;
  }

  move(direction) {
    const { top, left } = this.state;
    if (direction === 'top') {
      if (top === 0 || top === 1.5 || top === 1) {
        this.setState({
          top: 0,
        });
      } else {
        this.setState((state) => ({ top: state.top - 2 }));
      }
    } else if (direction === 'bottom') {
      if (top === 90 || top === 91.5 || top === 91) {
        this.setState({
          top: 91.5,
        });
      } else {
        this.setState((state) => ({ top: state.top + 2 }));
      }
    } else if (direction === 'right') {
      if (left === 0 || left === 1) {
        this.setState({
          left: 0,
        });
      } else {
        this.setState((state) => ({ left: state.left - 2 }));
      }
    } else if (direction === 'left') {
      if (left === 94 || left === 95) {
        this.setState({
          left: 95,
        });
      } else {
        this.setState((state) => ({ left: state.left + 2 }));
      }
    }
  }

  render() {
    // console.log(this.getCenter());
    const { top, left } = this.state;
    // console.log(distanceBetween({ top, left }, window.monsterLocation));
    if (distanceBetween({ top, left }, window.monsterLocation) < 8) {
      alert('TOUCHING!');
    }
    const playerPosition = { top: `${top}%`, left: `${left}%` };
    return (
      <div className="player" style={playerPosition} />
    );
  }
}

export default Player;
