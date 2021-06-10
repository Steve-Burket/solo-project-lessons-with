import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "SUBMIT_PRACTICE_LOG" actions
function* submitPracticeLog(action) {
  try {
    // clear any existing error on the practice log page
    // yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the practice log from the payload to the server
    yield axios.post('/practice_log', action.payload);

    // store practice log in redux
    // I think you want to fetch here, not set practice log to the single practice log right?
    // yield put({ type: 'SET_PRACTICE_LOG', payload: action.payload });
    yield put({ type: 'FETCH_PRACTICE_LOG' }); // you only want this, not the above line (fetch saga calls the SET)

  } catch (error) {
    console.log('Error with submitting practice log:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* fetchPracticeLogSaga() {
  console.log('in fetchPracticeLogSaga');

  try {
    const practiceLog = yield axios.get('/practice_log');
    yield put({ type: 'SET_PRACTICE_LOG', payload: practiceLog.data });
  } catch {
    console.log('GET practice log error');
  }
}
function* practiceLogSaga() {
  yield takeEvery('SUBMIT_PRACTICE_LOG', submitPracticeLog);
  yield takeEvery('FETCH_PRACTICE_LOG', fetchPracticeLogSaga);
}

export default practiceLogSaga;
