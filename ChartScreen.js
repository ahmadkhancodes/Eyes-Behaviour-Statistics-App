import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import { useSelector, useDispatch } from "react-redux";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";
import { getGraphData } from "./utils";
import DropDownPicker from "react-native-dropdown-picker";
import { dateKey } from "./utils";

export default function ChartScreen() {
  var ALL_DATA = useSelector((state) => state.data.allData);
  var todayData = useSelector((state) => state.data.todayData);
  var dates_arr = [];
  Object.keys(ALL_DATA).map((item) => {
    dates_arr.push({ label: item, value: item });
  });
  // States Data for Dropdown Picker
  const [open, setOpen] = useState(false);
  new Date().getUTCFullYear();
  const [value, setValue] = useState(dateKey);
  const [items, setItems] = useState(dates_arr);
  const [DATA, setDATA] = useState([]);

  React.useEffect(() => {
    if (ALL_DATA[value]) {
      setDATA(ALL_DATA[value]["DATA_FROM_STORE"]);
    }
    setItems(dates_arr);
  }, [todayData, value]);

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
              width={CHART_DATA.length > 3 ? CHART_DATA.length * 150 : 500}
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
