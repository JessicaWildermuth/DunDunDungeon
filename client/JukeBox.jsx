/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import { Howl, Howler } from 'howler';

class JukeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: null,
    };
    this.playSong = this.playSong.bind(this);
  }

  playSong(e) {
    const { currentSong } = this.state;
    if (currentSong) {
      Howler.stop();
    }
    const song = `${e.target.className}.mp3`;
    const sound = new Howl({
      src: song,
    });
    this.setState({
      currentSong: song,
    });
    sound.play();
  }

  render() {
    const { musicList } = this.props;
    return (
      <div id="music">
        { musicList.map((song) => (
          <div>
            <button className={song.title} type="button" onClick={this.playSong}>{song.title}</button>
          </div>
        ))}
      </div>
    );
  }
}

export default JukeBox;
