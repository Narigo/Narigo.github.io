import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Hero from './Hero';
import { createHero, increaseAttribute, removeHero, dealDamage } from './actions';

const standardHero = {
  strength : 1,
  dexterity : 1,
  intelligence : 1,
  vitality : 1,
  hitpoints : 100,
  cost : 1
};

let Heroes = React.createClass({

  addHero() {
    return this.props.dispatch(createHero(standardHero));
  },

  removeHero(id) {
    return () => this.props.dispatch(removeHero(id));
  },

  dealDamage(id) {
    return () => this.props.dispatch(dealDamage(id, 10));
  },

  increaseAttribute(id) {
    return (attr) => {
      if (this.props.availablePoints > 0) {
        this.props.dispatch(increaseAttribute(id, attr, 1));
      } else {
        console.log('not enough points available');
      }
    };
  },

  render() {
    let heroes = Immutable.fromJS(this.props.heroes);
    console.log('newest heroes', heroes);
    return (
      <section className="heroes">
        <h2>Your Heroes</h2>
        <div className="meta">
          You have <span className="available-points">{this.props.availablePoints}</span> points available.
        </div>
        <ol>
          {heroes.entrySeq().map(([id, hero]) => {
            console.log('hero=', id, hero);
            return (
              <li key={id}>
                <Hero id={id}
                      dealDamage={this.dealDamage(id)}
                      remove={this.removeHero(id)}
                      strength={hero.get('strength')}
                      dexterity={hero.get('dexterity')}
                      intelligence={hero.get('intelligence')}
                      vitality={hero.get('vitality')}
                      hitpoints={hero.get('hitpoints')}
                      increaseAttribute={this.increaseAttribute(id)}
                />
              </li>
            );
          })}
        </ol>
        <button onClick={this.addHero} disabled={this.props.availablePoints < standardHero.cost}>Click to add hero
        </button>
      </section>
    );
  }

});

Heroes.propTypes = {
  dispatch : React.PropTypes.func.isRequired,
  availablePoints : React.PropTypes.number.isRequired,
  heroes : React.PropTypes.object.isRequired
};

export default connect(state => {
  console.log('got a state in heroes to connect', state);
  return {availablePoints : state.account.heroes.availablePoints, heroes : state.account.heroes.heroes};
})(Heroes);
