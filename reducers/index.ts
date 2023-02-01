import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import authSlice from "./auth";
import accountSlice from "./account";
import productSlice from "./product";

// (이전상태, 액션) => 다음상태
const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        auth: authSlice.reducer,
        account: accountSlice.reducer,
        product: productSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
