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
      screenOptions={{
        tabBarShowLabel: false,
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
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Entypo
                name="camera"
                size={40}
                color={focused ? "black" : "grey"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chart"
        component={ChartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <AntDesign
                name="barschart"
                size={40}
                color={focused ? "black" : "grey"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome5
                name="list-ul"
                size={40}
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
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
