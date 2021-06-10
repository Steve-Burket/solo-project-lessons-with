import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }; 

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user');

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data, config});
    console.log('here are the teachers:', response.data);
    
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// function* fetchTeachers() {
//   try {
//     const teacher = yield axios.get('/teacher');

//     yield put({ type: 'SET_USER', payload: teacher.data})
//     console.log('Here is a list of the teachers', teacher.first_name);
    
//   } catch (error) {
//     console.log('Teacher get request failed', error);
    
//   }
// }
function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  // yield takeEvery('FETCH_TEACHERS', fetchTeachers);
}

export default userSaga;
