/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

class SpellBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { playerSpells } = this.props;
    return (
      <div className="spellbook">
        { playerSpells.length !== 0
          ? playerSpells.map((spell) => <li className={spell.type}>{spell.type}</li>)
          : null}
      </div>
    );
  }
}

export default SpellBook;
