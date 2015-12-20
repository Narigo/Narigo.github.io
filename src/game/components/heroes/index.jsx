import React from 'react';
import Immutable from 'immutable';
import Hero from './Hero';
import { addHero, removeHero, drainLife } from './actions';

let Heroes = React.createClass({

  addHero() {
    return this.props.dispatch(addHero(10, 100));
  },

  removeHero(id) {
    return () => this.props.dispatch(removeHero(id));
  },

  dealDamage(id) {
    return () => this.props.dispatch(drainLife(id, 10));
  },

  render() {
    let heroes = Immutable.fromJS(this.props.heroes);
    console.log('newest heroes', this.props.heroes);
    return (
      <section className="heroes">
        <h2>Your Heroes</h2>
        <ol>
          {heroes.entrySeq().map(([idx, hero]) => {
            console.log('hero=', hero);
            return (
              <li><Hero key={idx}
                        id={idx}
                        dealDamage={this.dealDamage(idx)}
                        remove={this.removeHero(idx)}
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

export default Heroes;
