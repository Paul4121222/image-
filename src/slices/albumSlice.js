import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  albumSelected: [],
  totalCount: 0,
};

//combine reducer and action
const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    //可直接改state，因為有加入套件immute，過去redux 因為immutable所以不能改
    selectAlbum(state, action) {
      //action type 為 album/selectAlbum
      state.albumSelected.push(action.payload);
    },

    cancelSelectAlbum(state, action) {
      state.albumSelected = state.albumSelected.filter(
        (id) => id != action.payload
      );
    },

    setTotal(state, action) {
      state.totalCount = action.payload;
    },
  },
});

export const { selectAlbum, cancelSelectAlbum, setTotal } = albumSlice.actions;
export default albumSlice.reducer;
