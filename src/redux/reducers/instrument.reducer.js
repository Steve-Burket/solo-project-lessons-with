const instrumentReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_INSTRUMENT':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.instruments
export default instrumentReducer;
