import React from 'react';
// import axios from 'axios';
// eslint-disable-next-line import/extensions
import Level from './Level.jsx';
import distanceBetween from './helpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerLocation: null,
      monsterLocation: null,
    };
    this.getLocation = this.getLocation.bind(this);
    this.checkOverlap = this.checkOverlap.bind(this);
  }

  getLocation(obj) {
    console.log(obj);
    const center = { top: obj.top + 4, left: obj.left + 4 };
    if (obj.type === 'player') {
      this.setState({
        playerLocation: center,
      });
    } else if (obj.type === 'monster') {
      this.setState({
        monsterLocation: center,
      });
    }
    this.checkOverlap();
  }

  checkOverlap() {
    const { playerLocation, monsterLocation } = this.state;
    if (distanceBetween(playerLocation, monsterLocation) < 8) {
      alert('TOUCHING!');
    }
  }

  render() {
    return (
      <div>
        <Level getLocation={this.getLocation} />
      </div>
    );
  }
}

export default App;
