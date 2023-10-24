import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  StatusBar,
  Pressable,
} from "react-native";
import { darkTheme, lightTheme } from "../themes/theme";
import { StatusBarStyle } from "react-native";
// import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SettingScreen() {
  //   const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsDarkMode((previousState) => !previousState);
    saveSettings("theme", !isDarkMode ? "dark" : "light");
    console.log("SETTING", "isDarkMode", !isDarkMode);
  };

  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const saveSettings = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Lỗi khi lưu cài đặt: ", error);
    }
  };

  useEffect(() => {
    getSettings("theme");
  }, []);
  const getSettings = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setIsDarkMode(value == "dark" ? true : false);
        // console.log("====================================");
        // console.log(value,themeStorage);
        // console.log("====================================");
        return value;
      }
    } catch (error) {
      console.error("Lỗi khi lấy cài đặt: ", error);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.text,
            { color: theme.textColor, margin: 10, fontWeight: 800 },
          ]}
        >
          {" "}
          SETTINGS
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              {
                color: theme.textColor,
                fontWeight: 200,
                textAlign: "center",
                alignSelf: "center",
                marginRight: 10,
              },
            ]}
          >
            {isDarkMode ? "Dark" : "Light"}
          </Text>
          <Switch
            // style={{}}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#0aff22" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDarkMode}
          />
        </View>

        <Image
          source={require("../../assets/x9-icon.png")}
          style={styles.image}
        ></Image>
        {/* <Pressable
          style={styles.button}
          onPress={() => {
            Toast.show({
              type: "success",
              text1: "Hello",
              text2: "This is some something 👋",
            });
          }}
        >
          <Text style={styles.text}>Start</Text>
        </Pressable> */}
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textColor }]}>
          Powered by Wallstpepe
        </Text>
      </View>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      {/* <Toast /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "200",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "200",
  },
  footer: {
    // backgroundColor: 'lightgray',
    padding: 10,
  },
  footerText: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: 200,
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "red",
    ios_backgroundColor: "blue",
  },
});
