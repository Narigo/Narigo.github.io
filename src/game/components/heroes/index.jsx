import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Hero from './Hero';
import { createHero, removeHero, drainLife } from './actions';

const standardHero = {
  attack: 10,
  hitpoints: 100,
  cost: 1
};

let Heroes = React.createClass({

  addHero() {
    return this.props.dispatch(createHero(standardHero));
  },

  removeHero(id) {
    return () => this.props.dispatch(removeHero(id));
  },

  dealDamage(id) {
    return () => this.props.dispatch(drainLife(id, 10));
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
            console.log('hero=', hero);
            return (
              <li><Hero key={id}
                        id={id}
                        dealDamage={this.dealDamage(id)}
                        remove={this.removeHero(id)}
                        attack={hero.get('attack')}
                        hitpoints={hero.get('hitpoints')}/></li>
            );
          })}
        </ol>
        <button onClick={this.addHero} disabled={this.props.availablePoints < standardHero.cost}>Click to add hero</button>
      </section>
    );
  }

});

export default connect(state => {
  console.log('got a state in heroes to connect', state);
  return {availablePoints : state.account.heroes.availablePoints, heroes : state.account.heroes.heroes};
})(Heroes);
