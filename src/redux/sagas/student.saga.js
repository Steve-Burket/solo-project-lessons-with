import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchStudents() {
  try {
    const student = yield axios.get('/student');

    yield put({ type: 'SET_STUDENT', payload: student.data });
    console.log('Here is a list of the students', student.data);
  } catch (error) {
    console.log('Students get request failed', error);
  }
}
function* studentSaga() {
  yield takeEvery('FETCH_STUDENTS', fetchStudents);
}

export default studentSaga;
