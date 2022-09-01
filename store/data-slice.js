import { createSlice } from "@reduxjs/toolkit";
import { dateKey } from "../utils";

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
      if (!actions.payload[dateKey]) {
        console.log("IN");
        state.todayData = [];
      } else {
        state.todayData = actions.payload[dateKey]["DATA_FROM_STORE"];
      }
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
