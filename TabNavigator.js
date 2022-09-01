import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { Entypo, AntDesign, FontAwesome5 } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
import CameraScreen from "./CameraScreen";
import ChartScreen from "./ChartScreen";
import ListScreen from "./ListScreen";

export default TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chart Screen"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 15,
          right: 15,
          elevation: 0,
          backgroundColor: "white",
          borderRadius: 15,
          height: 80,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Camera Screen"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Entypo
                name="camera"
                size={30}
                color={focused ? "black" : "grey"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chart Screen"
        component={ChartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <AntDesign
                name="barschart"
                size={30}
                color={focused ? "black" : "grey"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="List Screen"
        component={ListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome5
                name="list-ul"
                size={30}
                color={focused ? "black" : "grey"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
