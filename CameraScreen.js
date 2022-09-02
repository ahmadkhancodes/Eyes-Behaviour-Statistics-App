import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { Audio } from "expo-av";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { set, ref } from "firebase/database";
import { db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "./store/data-slice";
import { dateKey } from "./utils";

let sub;
var timeReset = 0;

export default function CameraScreen() {
  var DATA_FROM_STORE = useSelector((state) => state.data.todayData);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  // Calculating Eyes shuting Time
  const [eyesOnTime, setEyesOnTime] = useState();
  const [eyesOnTimeStamp, setEyesOnTimeStamp] = useState();

  const [hasPermission, setHasPermission] = React.useState(); //for storing camera permission
  const [faceData, setFaceData] = React.useState([]); //in this state we are storing user face expressions
  const [sound, setSound] = React.useState();

  const [eyesShut, setEyesShut] = useState(false);
  const [distLine, setdistLine] = useState();

  React.useEffect(() => {
    //this piece of code runs first time when project start
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false && !isFocused) {
    return <Text>No access to camera</Text>;
  }

  async function playSound() {
    //this function used to play the sound
    const { sound } = await Audio.Sound.createAsync(
      // javascript promise  to await if whole
      require("./assets/alarm.mp3")
    );
    setSound(sound); // we are  storing sound to remove this listner after the screen unmount

    await sound.playAsync(); //this functions runs the sound
  }

  React.useEffect(() => {
    return sound
      ? () => {
          // console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    //this function used to play the sound
    const { sound } = await Audio.Sound.createAsync(
      // javascript promise  to await if whole
      require("./assets/alarm.mp3")
    );
    setSound(sound); // we are  storing sound to remove this listner after the screen unmount

    await sound.playAsync(); //this functions runs the sound
  }

  React.useEffect(() => {
    // Storing Data into Firebase
    set(ref(db, `/${dateKey}`), {
      DATA_FROM_STORE,
    });
  }, [DATA_FROM_STORE]);

  React.useEffect(() => {
    return sound
      ? () => {
          // console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces); // we are storing data to show faces detail on screen
    // console.log(faces);
    //const mouthMidx = ((faceData?.[0]?.RIGHT_MOUTH?.x+faceData?.[0]?.LEFT_MOUTH?.x)/2)
    //const mouthMidy = ((faceData?.[0]?.RIGHT_MOUTH?.y.toFixed(3)+faceData?.[0]?.LEFT_MOUTH?.y.toFixed(3))/2)
    const distLine = Math.sqrt(
      Math.pow(
        faceData?.[0]?.NOSE_BASE?.x -
          (faceData?.[0]?.RIGHT_MOUTH?.x + faceData?.[0]?.LEFT_MOUTH?.x) / 2,
        2
      ) +
        Math.pow(
          faceData?.[0]?.NOSE_BASE?.y -
            (faceData?.[0]?.RIGHT_MOUTH?.y + faceData?.[0]?.LEFT_MOUTH?.y) / 2,
          2
        )
    );
    setdistLine(distLine);
    const eyesShut =
      (faces?.[0]?.rightEyeOpenProbability < 0.7 &&
        faces?.[0]?.leftEyeOpenProbability < 0.7) ||
      distLine < 9;
    setEyesShut(eyesShut); // here we store the current eyer status
    if (eyesShut && timeReset == 0) {
      var AMPM = new Date().getHours() < 12 ? "AM" : "PM";
      var today = new Date();
      var oNtimeStamp = today.getTime();
      var time =
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds() +
        " " +
        AMPM;
      setEyesOnTime(time);
      setEyesOnTimeStamp(oNtimeStamp);
      // console.log("Eyes Shut On: ", eyesShut, " Time : ", time);
      timeReset++;
    }
    if (!eyesShut && timeReset != 0) {
      var AMPM = new Date().getHours() < 12 ? "AM" : "PM";
      var today = new Date();
      var timeStamp = today.getTime();
      var time =
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds() +
        " " +
        AMPM;
      // console.log("Eyes Shut Close: ", eyesShut, " Time : ", time);
      timeReset = 0;
      if (eyesOnTime != time) {
        var diff = (timeStamp - eyesOnTimeStamp) / 1000 / 60;
        if (diff > 0.1) {
          dispatch(
            dataActions.addData({
              shutOnTime: eyesOnTime,
              shutOffTime: time,
              date: dateKey + "-" + new Date().getDay(),
              diff: diff,
            })
          );
        }
        // console.log("Today DATA : ", DATA_FROM_STORE);
      }
      setEyesOnTime(0);
    }
    // if (eyesShutsData.length != 0) {
    //   console.log("DATA : ", eyesShutsData);
    // }
  };

  //this is the main useEffect which play sound after every 1000
  // it runs when the status of evesShut changes.
  useEffect(() => {
    if (eyesShut) {
      sub = setInterval(() => {
        //we give setInterval 2 things one is interval and other is function which runs after the interval so according to our logic sound player after the interval we have given
        playSound();
      }, 1000);
    } else {
      clearInterval(sub); // if eyesshut becomes false we will cancel the interval which is going to plays sound after certain interval
    }
  }, [eyesShut]);

  if (isFocused) {
    return (
      <Camera
        type={Camera.Constants.Type.front}
        style={styles.camera}
        onFacesDetected={handleFacesDetected} // this is the main function which detect the user face
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            position: "absolute",
            top: 50,
            left: 10,
            padding: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              borderWidth: 2,
              borderColor: "grey",
              paddingHorizontal: 20,
            }}
          >
            <FontAwesome
              name="circle"
              size={25}
              color={
                faceData.length == 0 ? "black" : eyesShut ? "red" : "green"
              }
            />
            <Text
              style={{
                fontSize: 15,
                alignSelf: "center",
                marginLeft: 5,
                fontWeight: "bold",
              }}
            >
              {faceData.length == 0 ? "" : eyesShut ? "Sleeping" : "Awake"}
            </Text>
          </View>
        </View>
      </Camera>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  faces: {
    backgroundColor: "#ffffff",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  faceDesc: {
    fontSize: 20,
  },
});
