const teacherReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEACHER':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.teachers
export default teacherReducer;
