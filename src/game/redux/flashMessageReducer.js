import Immutable from 'immutable';

const initialFlashState = Immutable.Map({
  showMessage : false,
  message : '',
  closeable : true,
  buttons : Immutable.List()
});

function flashReducer(state = initialFlashState, action) {
  console.log('reducer flash message called with ', state, action);

  switch (action.type) {
    case 'SHOW_MESSAGE':
      return state.merge({
        showMessage : true,
        closeable : action.closeable !== false,
        message : action.message || '[no message received]',
        buttons : action.buttons || []
      });

    case 'DISMISS_MESSAGE':
      return state.set('showMessage', false);

    default:
      return state;
  }
}

export default flashReducer;
