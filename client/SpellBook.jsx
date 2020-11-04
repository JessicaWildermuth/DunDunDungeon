/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

class SpellBook extends React.Component {
  constructor(props) {
    super(props);
    this.spellRef = React.createRef();
    this.state = {

    };
    this.useSpell = this.useSpell.bind(this);
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
    const { checkSpellHit } = this.props;
    const node = this.spellRef.current;
    const spellName = node.className;
    if (node.id === spell) {
      checkSpellHit(spellName);
    }
  }

  render() {
    const { playerSpells } = this.props;
    let count = 0;
    return (
      <div className="spellbook">
        <img src="spellbook.png" alt="spellbook" />
        <h3 id="spellName">Spells</h3>
        <h3 id="spellDescription">Description</h3>
        { playerSpells.length !== 0
          ? playerSpells.map((spell) => {
            count += 1;
            return (
              <div>
                <div id="one" className={spell.type} ref={this.spellRef}>
                  {spell.type}
                  {' '}
                </div>
                <div className="description">
                  Deal One Damage to Nearby Enemies
                </div>
              </div>
            );
          })
          : null}
      </div>
    );
  }
}

export default SpellBook;
