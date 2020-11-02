/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

class SpellBook extends React.Component {
  constructor(props) {
    super(props);
    this.spellRef = React.createRef();
    this.state = {

    };
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      let spell;
      if (e.keyCode === 49) {
        spell = 'one';
      } else if (e.keyCode === 50) {
        spell = 'two';
      } else if (e.keyCode === 51) {
        spell = 'three';
      }
      if (spell) {
        this.useSpell(spell);
      }
    });
  }

  useSpell(spell) {
    const node = this.spellRef.current;
    if (node.id === spell) {
      alert('USE SPELL');
    }
  }

  render() {
    const { playerSpells } = this.props;
    let count = 0;
    return (
      <div className="spellbook">
        { playerSpells.length !== 0
          ? playerSpells.map((spell) => {
            count += 1;
            return (
              <button type="button" id="one" className={spell.type} ref={this.spellRef}>
                {spell.type}
                {' '}
                {spell.dmg}
              </button>
            );
          })
          : null}
      </div>
    );
  }
}

export default SpellBook;
