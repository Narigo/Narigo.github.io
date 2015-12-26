import Immutable from 'immutable';

const initialHeroState = {
  availablePoints : 0,
  heroes : {}
};

let lastId = 0;

export default function nextState(state = initialHeroState, action) {
  let newState;

  switch (action.type) {
    case 'INCREMENT_POINTS':
      newState = {
        ...state,
        availablePoints: state.availablePoints + action.amount
      };
      return newState;

    case 'DECREMENT_POINTS':
      newState = {
        ...state,
        availablePoints: state.availablePoints - action.amount
      };
      return newState;

    case 'ADD_HERO':
      let hero = action.hero;
      lastId = lastId + 1;
      hero.id = lastId;
      newState = {
        ...state,
        heroes : {
          ...state.heroes,
          [hero.id] : hero
        }
      };
      console.log('adding hero', hero.id);
      return newState;

    case 'REMOVE_HERO':
      console.log('removing hero', action.heroId);
      newState = {
        ...state,
        heroes : {
          ...state.heroes
        }
      };
      delete newState.heroes[action.heroId];
      return newState;

    case 'DRAIN_LIFE':
      console.log('draining life of hero', action.heroId);
      newState = {
        ...state,
        heroes : {
          ...state.heroes,
          [action.heroId] : {
            ...state.heroes[action.heroId],
            hitpoints : state.heroes[action.heroId].hitpoints - action.amount
          }
        }
      };
      return newState;

    default:
      return state;
  }
}
