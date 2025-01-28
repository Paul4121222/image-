import { configureStore } from "@reduxjs/toolkit";
import photo from "./slices/photoSlice";
import album from "./slices/albumSlice";
import list from "./slices/listSlice";

const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    album,
    photo,
    list,
  },
});

export default store;
