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
    setAllData(state, actions) {
      state.allData = actions.payload;
      var dateKey =
        new Date().getDate() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getUTCFullYear();
      state.todayData = actions.payload[dateKey]["DATA_FROM_STORE"];
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
