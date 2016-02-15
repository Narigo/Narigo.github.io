export const drainLife = (id, amount) => {
  return {
    type : 'DRAIN_LIFE',
    heroId : id,
    amount
  };
};

export const addHero = (hero) => {
  return {
    type : 'ADD_HERO',
    hero
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

export function decrementHeroPoints(amount) {
  return {
    type : 'DECREMENT_POINTS',
    amount
  };
}

export function increaseAttribute(heroId, attribute, amount) {
  return {
    type : 'INCREASE_ATTRIBUTE',
    heroId,
    attribute,
    amount
  }
}

export function dealDamage(id, damage) {
  return (dispatch, getState) => {
    console.log('dispatching dealDamage', getState());

    if (getState().getIn(['account', 'heroes', 'heroes', id, 'hitpoints']) > damage) {
      dispatch(drainLife(id, damage));
    } else {
      dispatch(removeHero(id));
    }
  };
}

export function createHero(hero) {
  return (dispatch, getState) => {
    console.log('dispatching createHero', dispatch, getState());

    if (getState().getIn(['account', 'heroes', 'availablePoints']) >= hero.cost) {
      dispatch(decrementHeroPoints(hero.cost));
      dispatch(addHero(hero));
    }
  };
}