const myTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MY_TEACHER':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.myTeacher
export default myTeacherReducer;
