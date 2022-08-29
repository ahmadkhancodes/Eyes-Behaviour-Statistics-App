import { SafeAreaView, Text, View, StyleSheet, FlatList } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

export default function ListScreen() {
  var DATA = useSelector((state) => state.data.todayData);
  var DATA_TO_DISPLAY = [];
  if (DATA != []) {
    // DATA = DATA["30-8-2022"]["DATA_FROM_STORE"];
    for (var i = 0; i < DATA.length; i++) {
      var temp = DATA[i]["date"][DATA[i]["date"].length - 1];
      var day;
      switch (temp) {
        case "1":
          day = "Monday";
          break;
        case "2":
          day = "Tuesday";
          break;
        case "3":
          day = "Wednesday";
          break;
        case "4":
          day = "Thursday";
          break;
        case "5":
          day = "Friday";
          break;
        case "6":
          day = "Saturday";
          break;
        case "7":
          day = "Sunday";
          break;
      }
      DATA_TO_DISPLAY.push({
        shutOffTime: DATA[i]["shutOffTime"],
        shutOnTime: DATA[i]["shutOnTime"],
        date: day + " " + DATA[i]["date"].slice(0, DATA[i]["date"].length - 2),
      });
    }
  }

  const renderItem = ({ item }) => (
    <>
      <View style={styles.itemContainer}>
        <Text
          style={{
            fontWeight: "900",
            fontSize: 20,
            marginBottom: 20,
            marginLeft: 16,
          }}
        >
          {item.date}
        </Text>
        <View style={styles.childContainer}>
          <FontAwesome name="eye-slash" size={30} color="black" />
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            {item.shutOnTime}
          </Text>
          <FontAwesome name="eye" size={30} color="black" />
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            {item.shutOffTime}
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>List Screen</Text>
      <FlatList
        data={DATA_TO_DISPLAY}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    marginBottom: 100,
  },
  childContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  itemContainer: {
    padding: 10,
    paddingVertical: 20,
    borderWidth: 1,
    marginVertical: 5,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#f2f7f4",
    borderColor: "#cacfcc",
    borderRadius: 10,
  },
  title: {
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
});
