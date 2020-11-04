/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';

class JukeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { musicList, playSong } = this.props;
    return (
      <div id="music">
        { musicList.map((song) => (
          <div>
            <button className={song.title} type="button" onClick={playSong}>{song.title}</button>
          </div>
        ))}
      </div>
    );
  }
}

export default JukeBox;
