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

export default function ChartScreen() {
  // States Data for Dropdown Picker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(dates_arr);

  var DATA = useSelector((state) => state.data.todayData);
  var ALL_DATA = useSelector((state) => state.data.allData);
  var dates_arr = [];
  Object.keys(ALL_DATA).map((item) => {
    dates_arr.push({ label: item, value: item });
  });
  React.useEffect(() => {
    setItems(dates_arr);
  }, []);
  const CHART_DATA = getGraphData(DATA);
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
              width={CHART_DATA.length > 5 ? CHART_DATA.length * 100 : 500}
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
