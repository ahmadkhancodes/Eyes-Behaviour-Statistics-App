import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";
import { getGraphData } from "./utils";
import DropDownPicker from "react-native-dropdown-picker";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import { dataActions } from "./store/data-slice";

export default function ChartScreen() {
  var ALL_DATA = useSelector((state) => state.data.allData);
  const [DATA, setDATA] = useState([]);
  var dates_arr = [];
  Object.keys(ALL_DATA).map((item) => {
    dates_arr.push({ label: item, value: item });
  });
  // States Data for Dropdown Picker
  const [open, setOpen] = useState(false);
  var dateKey =
    new Date().getDate() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getUTCFullYear();
  const [value, setValue] = useState(dateKey);
  const [items, setItems] = useState(dates_arr);

  React.useEffect(() => {
    setItems(dates_arr);
    // setDATA(ALL_DATA[value]["DATA_FROM_STORE"]);
    console.log(ALL_DATA);
    console.log(value);
  }, [value]);
  var CHART_DATA = getGraphData(DATA);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chart Screen</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      {DATA != [] ? (
        <>
          <ScrollView horizontal={true}>
            <VictoryChart
              domainPadding={{ x: 25 }}
              theme={VictoryTheme.material}
              width={CHART_DATA.length > 3 ? CHART_DATA.length * 140 : 500}
              height={
                Dimensions.get("screen").height -
                (Dimensions.get("screen").height * 40) / 100
              }
            >
              <VictoryBar
                barRatio={0.5}
                alignment="start"
                animate
                data={CHART_DATA}
                x="timeFrame"
                y="totalTime"
                style={{ data: { fill: "black" } }}
              />
            </VictoryChart>
          </ScrollView>
          <Text style={styles.subTitle}>
            Y-AXIS: Minutes &emsp; &emsp; X-AXIS: Timeframe
          </Text>
        </>
      ) : (
        <Text
          style={{
            fontSize: 20,
            alignSelf: "center",
            marginTop: 200,
          }}
        >
          No Data Available
        </Text>
      )}
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
  subTitle: {
    fontSize: 15,
    alignSelf: "center",
  },
});
