export const NEXT_TICK = {
  type : 'NEXT_TICK'
};

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
