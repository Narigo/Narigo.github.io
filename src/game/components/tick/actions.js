import { incrementHeroPoints } from '../heroes/actions';

const COMPUTE_TICK_DURATION = 200;
const DEFAULT_TICK_TIMEOUT = 500;
let timerId = null;

export const NEXT_TICK = {
  type : 'NEXT_TICK'
};

export const COMPUTE_NEXT_TICK = {
  type : 'COMPUTE_NEXT_TICK'
};

function nextTickIn(timeout, nextIn) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      timerId = setTimeout(() => {
        resolve(dispatch(computeNextTick(nextIn)));
      }, timeout);
    });
  };
}

export function stopTicking() {
  return (dispatch, getState) => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  }
}

export function computeNextTick(timeout = DEFAULT_TICK_TIMEOUT) {
  return (dispatch, getState) => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    console.log('dispatching compute_next_tick', dispatch, getState());
    dispatch(COMPUTE_NEXT_TICK);
    let start = +(new Date());
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        dispatch(incrementHeroPoints(1));
        dispatch(NEXT_TICK);
        console.log('resolve promise with dispatching next_tick', dispatch, getState());
        resolve(dispatch(nextTickIn(+(new Date()) - start + timeout, timeout)));
      }, COMPUTE_TICK_DURATION);
    });
  }
}
