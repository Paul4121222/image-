import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    selectedList: [],
    reloadKey: Math.random(),
  },
  reducers: {
    addToSelectedList(state, action) {
      state.selectedList.push(action.payload);
    },
    cancelSelectedList(state, action) {
      state.selectedList = state.selectedList.filter(
        (item) => item !== action.payload
      );
    },
    cleanSelected(state) {
      state.selectedList = [];
    },
    handleReload(state) {
      state.reloadKey = Math.random();
    },
  },
});

export const {
  addToSelectedList,
  cancelSelectedList,
  cleanSelected,
  handleReload,
} = listSlice.actions;
export default listSlice.reducer;
