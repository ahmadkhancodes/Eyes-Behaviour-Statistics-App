import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import { Provider, useDispatch } from "react-redux";
import store from "./store/index";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import { dataActions } from "./store/data-slice";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val() || {};
      if (data !== null) {
        dispatch(dataActions.setAllData(data));
        console.log("All Data Fetched from APP.JS");
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
