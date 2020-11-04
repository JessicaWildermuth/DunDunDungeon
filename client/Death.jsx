/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Howl } from 'howler';

class Death extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const sound = new Howl({
      src: 'aerith.mp3',
    });
    sound.play();
  }

  render() {
    return (
      <div className="dead">
        <img id="death" src="ash.gif" alt="death" />
        <h2 id="dead">YOU HAVE DIED</h2>
      </div>
    );
  }
}

export default Death;
