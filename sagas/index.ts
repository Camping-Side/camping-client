import { all, fork, take, call, put, takeEvery, takeLatest, throttle } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        // fork(postSaga),
        // fork(userSaga),
    ])
}