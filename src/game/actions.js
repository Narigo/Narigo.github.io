export const NEXT_TICK = {
  type : 'NEXT_TICK'
};

export const drainLife = (amount) => {
  return {
    type : 'DRAIN_LIFE',
    amount
  };
};
