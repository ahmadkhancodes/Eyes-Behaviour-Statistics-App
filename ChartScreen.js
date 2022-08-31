import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";
import { getGraphData } from "./utils";

export default function ChartScreen() {
  var DATA = useSelector((state) => state.data.todayData);
  getGraphData(DATA);
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
  const DATAA = [
    { totalTime: 5, timeFrame: "1:00AM -- 1:05AM" },
    { totalTime: 2, timeFrame: "2:00AM -- 1:02AM" },
    { totalTime: 0.6, timeFrame: "11:45AM -- 11:48AM" },
    { totalTime: 1, timeFrame: "3:00PM -- 3:01PM" },
    { totalTime: 3, timeFrame: "3i0PM -- 301PM" },
    { totalTime: 8, timeFrame: "3:0pPM -- 3:09PM" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chart Screen</Text>
      <ScrollView horizontal={true}>
        <VictoryChart
          verticalLabelRotation={30}
          domainPadding={{ x: 25 }}
          theme={VictoryTheme.material}
          width={DATAA.length > 5 ? DATAA.length * 100 : 500}
          height={
            Dimensions.get("screen").height -
            (Dimensions.get("screen").height * 40) / 100
          }
        >
          <VictoryBar
            barRatio={0.5}
            alignment="start"
            animate
            data={DATAA}
            x="timeFrame"
            y="totalTime"
            style={{ data: { fill: "black" } }}
          />
        </VictoryChart>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    marginBottom: 100,
  },
  title: {
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
});
