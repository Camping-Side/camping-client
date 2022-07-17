import { createWrapper } from "next-redux-wrapper";
import {applyMiddleware, createStore, compose} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";
import rootSaga from "../sagas";
import createSagaMiddleware from 'redux-saga';

// const loggerMiddleware = ({ dispatch, getState }) => (next: any) => (action: any) => {
//     console.log(action, dispatch, getState);
//     return next(action);
// };

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    // const middlewares = [sagaMiddleware, loggerMiddleware];
    const middlewares = [sagaMiddleware];
    // 배포용, 개발용 미들웨어 구분
    const enhancer = process.env.NODE_ENV === "production"
        ?   compose(applyMiddleware(...middlewares ))
        :   composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer);
    // store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === "development",
});

export default wrapper;