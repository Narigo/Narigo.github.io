export const drainLife = (id, amount) => {
  return {
    type : 'DRAIN_LIFE',
    heroId : id,
    amount
  };
};

export const addHero = (attack, hitpoints) => {
  return {
    type : 'ADD_HERO',
    hero : {
      attack,
      hitpoints
    }
  };
};

export const removeHero = (heroId) => {
  return {
    type : 'REMOVE_HERO',
    heroId
  };
};

export function incrementHeroPoints(amount) {
  return {
    type : 'INCREMENT_POINTS',
    amount
  };
}

export function createHero(attack, hitpoints, cost) {
  return (dispatch, getState) => {
    console.log('dispatching compute_next_tick', dispatch, getState());

    dispatch({
      type : 'DECREMENT_POINTS',
      amount : cost
    });
    dispatch(addHero(attack, hitpoints));
  };
}