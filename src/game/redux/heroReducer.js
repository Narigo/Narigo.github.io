import Immutable from 'immutable';

const initialHeroState = {};

let lastId = 0;

export default function nextState(state = initialHeroState, action) {
  let newState;
  switch (action.type) {
    case 'ADD_HERO':
      let hero = action.hero;
      lastId = lastId + 1;
      hero.id = lastId;
      newState = Object.assign({}, state);
      newState[hero.id] = hero;
      console.log('adding hero', hero.id);
      return newState;
    case 'REMOVE_HERO':
      console.log('removing hero', action.heroId);
      newState = Object.assign({}, state);
      delete newState[action.heroId];
      return newState;
    case 'DRAIN_LIFE':
      console.log('draining life of hero', action.heroId);
      newState = Object.assign({}, state);
      let newHero = Object.assign({}, newState[action.heroId]);
      newHero.hitpoints -= action.amount;
      newState[action.heroId] = newHero;
      return newState;
    default:
      return state;
  }
}
