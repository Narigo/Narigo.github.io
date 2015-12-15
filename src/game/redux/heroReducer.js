import Immutable from 'immutable';

const initialHeroState = Immutable.fromJS([]);

export default function nextState(state = initialHeroState, action) {
  switch (action.type) {
    case 'ADD_HERO':
      return state.push(Immutable.fromJS(action.hero));
    case 'DRAIN_LIFE':
      return state.update(action.heroId,
        (oldHero) => oldHero.update('hitpoints', (oldHitpoints) => oldHitpoints - action.amount));
    default:
      return state;
  }
}
