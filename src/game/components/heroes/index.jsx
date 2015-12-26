import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Hero from './Hero';
import { createHero, removeHero, drainLife } from './actions';

let Heroes = React.createClass({

  addHero() {
    return this.props.dispatch(createHero(10, 100, 1));
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
        <div className="">
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
        <button onClick={this.addHero}>Click to add hero</button>
      </section>
    );
  }

});

export default connect(state => {
  console.log('got a state in heroes to connect', state);
  return {availablePoints : state.heroes.availablePoints, heroes : state.heroes.heroes};
})(Heroes);
