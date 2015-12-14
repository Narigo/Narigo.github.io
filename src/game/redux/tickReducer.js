import { NEXT_TICK } from '../actions';

const initialState = {
  tickNr: 0
};

export default function nextState(state = initialState, action) {
  switch (action) {
    case NEXT_TICK:
      return {
        ...state,
        tickNr : state.tickNr + 1
      };
    default:
      return state;
  }
}
