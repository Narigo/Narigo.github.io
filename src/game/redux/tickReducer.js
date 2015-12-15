const initialTickState = {
  nr : 0
};

export default function nextState(tickState = initialTickState, action) {
  switch (action.type) {
    case 'NEXT_TICK':
      return {
        ...tickState,
        nr : tickState.nr + 1
      };
    default:
      return tickState;
  }
}
