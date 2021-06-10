import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchTeachers() {
  try {
    const teacher = yield axios.get('/teacher');

    yield put({ type: 'SET_TEACHER', payload: teacher.data });
    console.log('Here is a list of the teachers', teacher.data);
  } catch (error) {
    console.log('Teacher get request failed', error);
  }
}
function* teacherSaga() {
  yield takeEvery('FETCH_TEACHERS', fetchTeachers);
}

export default teacherSaga;
