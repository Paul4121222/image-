import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photoSelected: [],
  size: "middle",
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setSize(state, action) {
      //payload為值，type是自動生成的，基於name跟reducer名稱
      state.size = action.payload;
    },
  },
});

export const { setSize } = photoSlice.actions;
export default photoSlice.reducer;
