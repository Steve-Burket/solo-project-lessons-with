import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "SUBMIT_PRACTICE_LOG" actions
function* submitPracticeLog(action) {
  try {
         const config = {
           headers: { 'Content-Type': 'application/json' },
           withCredentials: true
         };

    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/practice_log', action.payload, config);

    // store practice log in redux
    yield put({ type: 'SET_PRACTICE_LOG', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    // yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with submitting practice log:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* fetchPracticeLogSaga() {
    console.log('in fetchPracticeLogSaga');

    try {
        const practiceLog = yield axios.get('/practice_log');
        yield put({ type: 'SET_PRACTICE_LOG', payload: practiceLog.data})
    } catch {
        console.log('GET practice log error');
        
    }
    
}
function* practiceLogSaga() {
  yield takeEvery('SUBMIT_PRACTICE_LOG', submitPracticeLog);
  yield takeEvery('FETCH_PRACTICE_LOG', fetchPracticeLogSaga);
}

export default practiceLogSaga;
