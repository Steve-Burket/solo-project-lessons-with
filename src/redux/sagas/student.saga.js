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

function* fetchMyTeacher() {
  try {
    const myTeacher= yield axios.get('/student/myinstructor');

    yield put({ type: 'SET_MY_TEACHER', payload: myTeacher.data });
    console.log('Here is a list of the my teachers', myTeacher.data);
  } catch (error) {
    console.log('Teachers get request failed', error);
  }
}


function* studentSaga() {
  yield takeEvery('FETCH_STUDENTS', fetchStudents);
  // yield teakeEvery('FETCH_MY_TEACHER', fetchMyTeacher);
}

export default studentSaga;
