import Immutable from 'immutable';

const initialTickState = Immutable.Map({
  nr : 0,
  isComputing : false
});

export default function nextState(tickState = initialTickState, action) {
  console.log('reducer tick called with ', tickState, action);

  switch (action.type) {
    case 'COMPUTE_NEXT_TICK':
      console.log('next state -> compute_next_tick called');
      return tickState.set('isComputing', true);

    case 'NEXT_TICK':
      console.log('next state -> next_tick called');
      return tickState.merge({
        nr : tickState.get('nr') + 1,
        isComputing : false
      });

    default:
      return tickState;
  }
}
