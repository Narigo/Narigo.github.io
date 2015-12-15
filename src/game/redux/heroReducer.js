const initialHeroState = {
  attack : 10,
  hitpoints : 100
};

export default function nextState(state = initialHeroState, action) {
  switch (action.type) {
    case 'DRAIN_LIFE':
      return {
        ...state,
        hitpoints : state.hitpoints - action.amount
      };
    default:
      return state;
  }
}
