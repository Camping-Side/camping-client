import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import rootReducer from "../reducers";

const isDev =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development";
const middleware = getDefaultMiddleware();
if (isDev) {
  middleware.push(logger);
}
const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: isDev,
});

const createStore = () => {
  return store;
};

const wrapper = createWrapper(createStore, {
  debug: isDev,
});

export default wrapper;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
