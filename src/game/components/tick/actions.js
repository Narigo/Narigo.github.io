export const NEXT_TICK = {
  type : 'NEXT_TICK'
};

export const COMPUTE_NEXT_TICK = {
  type : 'COMPUTE_NEXT_TICK'
};

export function computeNextTick() {
  return (dispatch, getState) => {
    console.log('dispatching compute_next_tick', dispatch, getState());
    dispatch(COMPUTE_NEXT_TICK);
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        console.log('resolve promise with dispatching next_tick', dispatch, getState());
        resolve(dispatch(NEXT_TICK));
      }, 2000);
    });
  }
}