import React from 'react';
import Immutable from 'immutable';
import Hero from './Hero';
import { addHero } from './actions';

let Heroes = React.createClass({

  addHero() {
    return this.props.dispatch(addHero(10, 100));
  },

  render() {
    let heroes = Immutable.fromJS(this.props.heroes);
    return (
      <section className="heroes">
        <h2>Your Heroes</h2>
        <ol>
          {heroes.map((hero, idx) => {
            return (
              <li><Hero key={idx} id={idx} dispatch={this.props.dispatch} attack={hero.get('attack')}
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
