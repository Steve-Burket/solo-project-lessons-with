const logDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PRACTICE_LOG_DETAILS':
      return {...action.payload};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.logDetails
export default logDetailsReducer;
