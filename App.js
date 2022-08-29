import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import { Provider, useDispatch } from "react-redux";
import store from "./store/index";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import { dataActions } from "./store/data-slice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    var dateKey =
      new Date().getDate() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getUTCFullYear();
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        dispatch(dataActions.setAllData(data));
        dispatch(dataActions.setTodayData(data[dateKey]["DATA_FROM_STORE"]));
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
