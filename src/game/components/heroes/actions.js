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

export function dealDamage(hero, damage) {
  let h = hero.toJS();
  return (dispatch, getState) => {
    console.log('dispatching dealDamage', h, getState(), getState().account.heroes.heroes[h.id].hitpoints);

    console.log('hp > damage?', getState().account.heroes.heroes[h.id].hitpoints, damage);
    if (getState().account.heroes.heroes[h.id].hitpoints > damage) {
      dispatch(drainLife(h.id, damage));
    } else {
      dispatch(removeHero(h.id));
    }
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