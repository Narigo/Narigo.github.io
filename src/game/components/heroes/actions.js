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

export function createHero(hero) {
  return (dispatch, getState) => {
    console.log('dispatching createHero', dispatch, getState());

    if (getState().account.heroes.availablePoints >= hero.cost) {
      dispatch({
        type : 'DECREMENT_POINTS',
        amount : hero.cost
      });
      dispatch(addHero(hero.attack, hero.hitpoints));
    }
  };
}