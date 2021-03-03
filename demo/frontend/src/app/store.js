/** Redux ToolKit */

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/User/UserSlice";

const store = configureStore({
  // pass object full of "slice reducers" and configureStore will
  // call combineReducers for you
  reducer: {
    // 'reducer_name' : reducer
    user: userSlice.reducer,
  },
});

export default store;
