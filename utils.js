export const getGraphData = (array) => {
  //   console.log(array);
  var ARR_To_RETURN = [];
  for (var i = 0; i < array.length; i++) {
    ARR_To_RETURN.push({
      timeFrame: array[i]["shutOnTime"] + " - " + array[i]["shutOffTime"],
      totalTime: array[i]["diff"],
    });
  }
  return ARR_To_RETURN;
};
