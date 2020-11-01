/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

class Spell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    // const { spellLocation } = this.props;
    // if (spellLocation !== null) {
    //   const location = { top: `${spellLocation.top}%`, left: `${spellLocation.left}%` };
    //   return <div className="spell" style={location} />;
    // }
    // return null;
    const { spells } = this.props;
    return spells.map((spell) => {
      const { location } = spell;
      const spellLocation = { top: `${location.top}%`, left: `${location.left}%` };
      return <div className="spell" style={spellLocation} />;
    });
  }
}

export default Spell;
