const initialTickState = {
  nr : 0,
  isComputing : false
};

export default function nextState(tickState = initialTickState, action) {
  switch (action.type) {
    case 'COMPUTE_NEXT_TICK':
      return {
        ...tickState,
        isComputing : true
      };
    case 'NEXT_TICK':
      return {
        ...tickState,
        nr : tickState.nr + 1,
        isComputing : false
      };
    default:
      return tickState;
  }
}
