import React from 'react';

class Monster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: null,
      left: null,
    };
    this.sendLocation = this.sendLocation.bind(this);
  }

  componentDidMount() {
    const { top, left } = this.state;
    const randomTop = Math.floor(Math.random() * (90 - 0) + 0);
    const randomleft = Math.floor(Math.random() * (95 - 0) + 0);
    this.setState({
      top: randomTop,
      left: randomleft,
    });
    const directions = ['top', 'left', 'bottom', 'right'];
    setInterval(() => {
      const index = Math.floor(Math.random() * Math.floor(directions.length));
      const randomDirection = directions[index];
      if (randomDirection === 'top') {
        if (top === 0 || top === 1.5 || top === 1) {
          this.setState({
            top: 0,
          });
        } else {
          this.setState((state) => ({ top: state.top - 2 }));
        }
      } else if (randomDirection === 'bottom') {
        if (top === 90 || top === 91.5 || top === 91) {
          this.setState({
            top: 91.5,
          });
        } else {
          this.setState((state) => ({ top: state.top + 2 }));
        }
      } else if (randomDirection === 'right') {
        if (left === 0 || left === 1) {
          this.setState({
            left: 0,
          });
        } else {
          this.setState((state) => ({ left: state.left - 2 }));
        }
      } else if (randomDirection === 'left') {
        if (left === 94 || left === 95) {
          this.setState({
            left: 95,
          });
        } else {
          this.setState((state) => ({ left: state.left + 2 }));
        }
      }
      this.sendLocation();
    }, 300);
  }

  sendLocation() {
    const { top, left } = this.state;
    const { getLocation } = this.props;
    getLocation({ type: 'monster', top, left });
  }

  render() {
    const { top, left } = this.state;
    window.monsterLocation = { top, left };
    const monsterPosition = { top: `${top}%`, left: `${left}%` };
    return (
      <div className="monster" style={monsterPosition} />
    );
  }
}

export default Monster;
