const practiceLogReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PRACTICE_LOG':
      return action.payload;
    case 'UNSET_PRACTICE_LOG':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.practiceLog
export default practiceLogReducer;
