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
        <img src="boxSelect.png" alt="musicBox" id="musicBox" />
        { musicList.map((song) => (
          <div>
            <button className={song.id} type="button" onClick={playSong}>{song.title}</button>
          </div>
        ))}
      </div>
    );
  }
}

export default JukeBox;
