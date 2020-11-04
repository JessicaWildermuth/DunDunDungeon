/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Howl } from 'howler';

class Winner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const sound = new Howl({
      src: 'fanfare.mp3',
    });
    sound.play();
  }

  render() {
    return (
      <div id="win">
        <h2 className="winner">YOU HAVE COMPLETED THE GAME DEMO!</h2>
      </div>
    );
  }
}

export default Winner;