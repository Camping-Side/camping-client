import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
} from '../reducers/user';

function logInAPI(data: any) {
  console.log('saga loginApi: ', data)
  data.email = 'admin@gmail.com'
  data.password = '1111'
  return axios.post('http://localhost:9060/api/v1/auth/login', data);
}

function* logIn(action: any) {
  try {
    console.log('saga login: ', action)
    // @ts-ignore
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err: any) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
export default function* userSaga() {
  yield all([
    fork(watchLogIn),
  ]);
}
