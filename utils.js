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

export const extractDate = (date) => {
  return date.split(" ")[1];
};

// export const dateKey = "1-9-2022";

export const dateKey =
  new Date().getDate() +
  "-" +
  (new Date().getMonth() + 1) +
  "-" +
  new Date().getUTCFullYear();
