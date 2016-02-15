import Immutable from 'immutable';

const initialHeroState = Immutable.fromJS({
  availablePoints : 0,
  heroes : {}
});

let lastId = 0;

export default function nextState(state = initialHeroState, action) {

  switch (action.type) {
    case 'INCREMENT_POINTS':
      return state.update('availablePoints', v => v + action.amount);

    case 'DECREMENT_POINTS':
      return state.update('availablePoints', v => v - action.amount);

    case 'INCREASE_ATTRIBUTE':
      console.log('increasing attribute', state);
      return state.updateIn(['heroes', action.heroId, action.attribute], v => v + action.amount);

    case 'SET_HEROES' :
      return state.merge({
        availablePoints : action.availablePoints,
        heroes : action.heroes
      });

    case 'ADD_HERO':
      let hero = action.hero;
      lastId = lastId + 1;
      hero.id = lastId;
      console.log('adding hero', hero.id);
      return state.updateIn(['heroes', hero.id], v => Immutable.fromJS(hero));

    case 'REMOVE_HERO':
      console.log('removing hero', action.heroId);
      return state.removeIn(['heroes', action.heroId]);

    case 'DRAIN_LIFE':
      console.log('draining life of hero', action.heroId);
      return state.updateIn(['heroes', action.heroId, 'hitpoints'], v => v - action.amount);

    default:
      return state;
  }
}
