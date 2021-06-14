import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "SUBMIT_PRACTICE_LOG" actions
function* submitPracticeLog(action) {
  try {
    // passes the practice log from the payload to the server
    yield axios.post('/practice_log', action.payload);

    // store practice log in redux
    yield put({ type: 'FETCH_PRACTICE_LOG' });
  } catch (error) {
    console.log('Error with submitting practice log:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* fetchPracticeLogSaga() {
  console.log('in fetchPracticeLogSaga');

  try {
    const practiceLog = yield axios.get('/practice_log');
    console.log('here is the practice log coming into the saga: ', practiceLog);

    // const studentPracticeLog = yield axios.get('/practice_log/student')
    // yield put({ type: 'SET_PRACTICE_LOG', payload: studentPracticeLog.data });
    yield put({ type: 'SET_PRACTICE_LOG', payload: practiceLog.data });
  } catch {
    console.log('GET practice log error');
  }
}

// this saga is to handle the student's view of their logs
function* fetchStudentPracticeLogSaga() {
  console.log('in fetchPracticeLogSaga');

  try {
    const studentPracticeLog = yield axios.get('/practice_log/student');
    yield put({
      type: 'SET_STUDENT_PRACTICE_LOG',
      payload: studentPracticeLog.data
    });
  } catch {
    console.log('GET student view of practice log error');
  }
}

// worker Saga: will be fired on "UPDATE_LOG"
function* editLog(action) {
  try {
    // passes the practice log from the payload to the server
    yield axios.put(`/practice_log/${action.payload}`, action.payload);

   
    // yield put({ type: 'FETCH_STUDENT_PRACTICE_LOG' });
  } catch (error) {
    console.log('Error with submitting practice log:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

// Create a saga to DELETE fruit from the server
function* deleteLog(action) {
  try {
    yield axios.delete(`/practice_log/${action.payload}`);
    yield put({ type: 'FETCH_STUDENT_PRACTICE_LOG' });
  } catch (err) {
    console.log('Error DELETEing fruit', err);
  }
}

function* practiceLogSaga() {
  yield takeEvery('SUBMIT_PRACTICE_LOG', submitPracticeLog);
  yield takeEvery('FETCH_PRACTICE_LOG', fetchPracticeLogSaga);
  yield takeEvery('FETCH_STUDENT_PRACTICE_LOG', fetchStudentPracticeLogSaga);
  yield takeEvery('DELETE_LOG', deleteLog);
   yield takeEvery('UPDATE_LOG', editLog);
}

export default practiceLogSaga;
