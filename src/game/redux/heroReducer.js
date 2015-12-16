import Immutable from 'immutable';

const initialHeroState = {};

let lastId = 0;

export default function nextState(state = initialHeroState, action) {
  let newState;
  switch (action.type) {
    case 'ADD_HERO':
      let hero = action.hero;
      hero.id = ++lastId;
      newState = Object.assign({}, state);
      newState[hero.id] = hero;
      return newState;
    case 'REMOVE_HERO':
      newState = Object.assign({}, state);
      delete newState[action.heroId];
      return newState;
    case 'DRAIN_LIFE':
      newState = Object.assign({}, state);
      let newHero = Object.assign({}, newState[action.heroId]);
      newHero.hitpoints -= action.amount;
      newState[action.heroId] = newHero;
      return newState;
    default:
      return state;
  }
}
