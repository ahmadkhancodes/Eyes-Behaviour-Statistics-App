export const getGraphData = (array) => {
  //   console.log(array);
  var ARR_To_RETURN = [];
  for (var i = 0; i < array.length; i++) {
    calculateTimeDiff(array[i]["shutOffTime"], array[i]["shutOnTime"]);
    ARR_To_RETURN.push({
      timeFrame: array[i]["shutOnTime"] + " - " + array[i]["shutOffTime"],
    });
  }
  //   console.log(ARR_To_RETURN);
};

const calculateTimeDiff = (str1, str2) => {
  var newStr1 = str1.slice(0, str1.length - 3);
  var newStr2 = str2.slice(0, str2.length - 3);
  var newStr1Arr = newStr1.split(":");
  var newStr2Arr = newStr2.split(":");
  var sh = 3;
  var sm = 16;
  var ss = 10;
  var eh = 3;
  var em = 16;
  var es = 15;
  let startDate = new Date("2020-05-05", "3:16:10");
  let endDate = new Date("2020-05-05", "3:16:15");
  var difference = endDate.getTime() - startDate.getTime();
  difference = difference / 1000;
  var hourDifference = Math.floor(difference / 3600);
  difference -= hourDifference * 3600;
  var minuteDifference = Math.floor(difference / 60);
  difference -= minuteDifference * 60;
  console.log("DIFF : " + difference);
};
