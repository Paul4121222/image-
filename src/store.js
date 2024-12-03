import { configureStore } from "@reduxjs/toolkit";
import photo from "./slices/photoSlice";
import album from "./slices/albumSlice";

const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    album,
    photo,
  },
});

export default store;
