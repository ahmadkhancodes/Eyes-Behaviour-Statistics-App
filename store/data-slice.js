import { createSlice } from "@reduxjs/toolkit";

const initialDataState = {
  todayData: new Array(),
  allData: new Array(),
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialDataState,
  reducers: {
    addData(state, actions) {
      var temp = state.todayData;
      temp.push(actions.payload);
      state.todayData = temp;
    },
    setTodayData(state, actions) {
      state.todayData = actions.payload;
    },
    setAllData(state, actions) {
      state.allData = actions.payload;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
