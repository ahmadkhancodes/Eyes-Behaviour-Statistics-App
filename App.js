import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import { initializeApp } from "firebase/app";

export default function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB9RJPAtsbZLjC8th7lRTMrLdCODlNLV4k",
    authDomain: "eyes-movement-stat-app.firebaseapp.com",
    projectId: "eyes-movement-stat-app",
    storageBucket: "eyes-movement-stat-app.appspot.com",
    messagingSenderId: "845169296336",
    appId: "1:845169296336:web:b698999c119ed3624c6fd5",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
