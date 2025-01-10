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
    addPhotoSelected(state, action) {
      state.photoSelected.push(action.payload);
    },
    removePhotoSelected(state, action) {
      state.photoSelected = state.photoSelected.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { setSize, addPhotoSelected, removePhotoSelected } =
  photoSlice.actions;
export default photoSlice.reducer;
