import {
  Action,
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
  Store,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import logger from "redux-logger";
import rootReducer from "../reducers";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const isDev =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development";
const middleware = getDefaultMiddleware();
if (isDev) {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: isDev,
});

const setupStore = (context: any): EnhancedStore => store;

const makeStore: MakeStore<any> = (context: any) => setupStore(context);

export const persistor = persistStore(store);

export const wrapper = createWrapper<Store>(makeStore);

export default wrapper;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
