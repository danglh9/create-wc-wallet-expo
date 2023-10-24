import { registerRootComponent } from "expo";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { getLocalStorage } from "../utils/EIP155Wallet";
// import SvgComponent from "../svg/Search.js";
import Svg, { Path } from "react-native-svg";
import SvgComponent from "../svg/logo";
``;
import Search from "../svg/search";
import Logo from "../../assets/logo.svg";

// import SvgComponent from "./svg/Search";
// import SearchIcon from "../svg/Search";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    this.timeout = setTimeout(() => {
      getLocalStorage
        ? navigation.navigate("Main")
        : navigation.navigate("CreateOrRestore");
      console.log("Hành động sau 1 giây");
    }, 1000); // 1000 milliseconds = 1 giây
  }, []);

  return (
    <View style={styles.container}>
      {/* <SvgComponent /> */}
      <Logo width={200} height={200} />
      {/* <Button
        title="OK"
        onPress={() => {
          navigation.navigate("CreateOrRestore");
        }}
      ></Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#222328",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    height: 160,
    resizeMode: "contain",
  },
});

registerRootComponent(SplashScreen);
