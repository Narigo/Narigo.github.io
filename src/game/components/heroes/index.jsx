import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Hero from './Hero';
import { showMessage, dismissMessage } from '../message/actions';
import { createHero, decrementHeroPoints, increaseAttribute, removeHero, dealDamage } from './actions';

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
        this.props.dispatch(decrementHeroPoints(1));
        this.props.dispatch(increaseAttribute(id, attr, 1));
      } else {
        this.props.dispatch(showMessage({
          text : 'Not enough points available!',
          buttons : [{
            text : 'No way!',
            action : () => {
              return (dispatch) => {
                dispatch(showMessage({text : 'Sorry.'}));
              };
            }
          }, {
            text : 'Okay.',
            action : () => {
              return dismissMessage;
            }
          }]
        }));
      }
    };
  },

  render() {
    let heroes = Immutable.fromJS(this.props.heroes);
    console.log('render heroes', heroes);
    return (
      <section className="heroes">
        <h2>Your Heroes</h2>
        <div className="meta">
          You have <span className="available-points">{this.props.availablePoints}</span> points available.
        </div>
        <ol>
          {heroes.map((hero) => {
            console.log('hero=', hero);
            const id = hero.get('id');
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
  const stateObj = state.toJS();
  console.log('got a state in heroes to connect', stateObj);
  console.log('heroState', state.getIn(['account', 'heroes']).toJS());
  return state.getIn(['account', 'heroes']).toJS();
})(Heroes);
