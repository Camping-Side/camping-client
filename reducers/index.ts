import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import authSlice from "./auth";
import accountSlice from "./account";
import productSlice from "./product";
import communitySlice from "./community";
import shopSlice from "./shop";
import bannerSlice from "./banner";

import _ from "lodash";

// (이전상태, 액션) => 다음상태
const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE: {
      return _.merge(action.payload, state);
    }
    default: {
      const combinedReducer = combineReducers({
        auth: authSlice.reducer,
        account: accountSlice.reducer,
        product: productSlice.reducer,
        community: communitySlice.reducer,
        shop: shopSlice.reducer,
        banner: bannerSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
