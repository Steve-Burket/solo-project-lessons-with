import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchInstruments() {
  try {
    const instrument = yield axios.get('/instrument');

    yield put({ type: 'SET_INSTRUMENT', payload: instrument.data });
    console.log('Here is a list of the instruments', instrument.data);
  } catch (error) {
    console.log('Instrument get request failed', error);
  }
}
function* instrumentSaga() {
  yield takeEvery('FETCH_INSTRUMENTS', fetchInstruments);
}

export default instrumentSaga;
