import { all, fork, take, call, put, takeEvery, takeLatest, throttle } from "redux-saga/effects";

import userSaga from "../sagas/user";

export default function* rootSaga() {
    yield all([
        fork(userSaga),
    ])
}