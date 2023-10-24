import { useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import PagerView from "react-native-pager-view";
import { MarketScreen } from "./Market";
import { WalletScreen } from "./Wallet";
import { SettingScreen } from "./Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkTheme, lightTheme } from "../themes/theme";
import ListAddressScreen from "./ListAddressScreen";
import { registerRootComponent } from "expo";
import WalletMain from "./WalletMain";
import X9WebView from "./WebView";
import App2 from "./App2";
import CreateOrRestoreScreen from "./CreateOrRestoreScreen";
import WalletIcon from "../../assets/icon_wallet.svg";
import Tab2Icon from "../../assets/icon_tab2.svg";
import DappIcon from "../../assets/icon_dapp.svg";
import SwapIcon from "../../assets/icon_swap.svg";
import SettingIcon from "../../assets/icon_setting.svg";

const tabBars = [
  {
    icon: <WalletIcon />,
    iconActive: require("../../assets/logo_x.png"),
    title: "Wallet",
    key: 1,
  },
  {
    icon: <Tab2Icon />,
    iconActive: require("../../assets/logo_x.png"),
    title: "Discovery",
    key: 2,
  },

  {
    icon: <DappIcon />,
    iconActive: require("../../assets/logo_x.png"),
    title: "Dapp",
    key: 3,
  },
  {
    iconActive: require("../../assets/logo_x.png"),
    icon: <SwapIcon />,
    title: "Swap",
    key: 4,
  },
  {
    iconActive: require("../../assets/logo_x.png"),
    icon: <SettingIcon />,
    title: "Setting",
    key: 5,
  },
];

const Main = () => {
  const ref = React.useRef(PagerView);
  const [themeStorage, setThemeStorage] = useState(darkTheme);
  const [activeTab, setActiveTab] = useState(0);

  // const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    getSettings("theme");
  }, []);
  const getSettings = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setThemeStorage(value == "dark" ? darkTheme : lightTheme);
        console.log("====================================");
        console.log(value, themeStorage);
        console.log("====================================");
        return value;
      }
    } catch (error) {
      console.error("Lỗi khi lấy cài đặt: ", error);
    }
  };
  const handlePageChange = (event) => {
    const page = event.nativeEvent.position;
    setActiveTab(page);
    // console.log('Current page:', page);
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStorage.backgroundColor },
      ]}
    >
      <View style={styles.tabBar}>
        {Object.keys(tabBars).map((key) => {
          return (
            <View style={styles.tab}>
              <TouchableOpacity
                onPress={() => {
                  ref.current.setPage(tabBars[key].key - 1);
                }}
              >
                <View style={styles.tab2}>
                  {/* <WalletIcon></WalletIcon> */}
                  {tabBars[key].icon}
                  {/* React.FunctionComponent<React.SVGAttributes<SVGElement>> */}
                  {/* <Image
                    source={
                      activeTab == tabBars[key].key - 1
                        ? tabBars[key].iconActive
                        : tabBars[key].icon
                    }
                    style={styles.tabIcon}
                  ></Image> */}
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color:
                          activeTab == tabBars[key].key - 1 ? "green" : "white",
                      },
                    ]}
                  >
                    {tabBars[key].title}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={ref}
        onPageSelected={handlePageChange}
      >
        <View key="1">
          <WalletMain />
        </View>
        <View key="2">
          <MarketScreen />
        </View>
        <View key="3">
          <X9WebView />
        </View>
        <View key="4">
          <App2 />
        </View>
        <View key="5">
          <CreateOrRestoreScreen />
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    backgroundColor: "#222328",
    paddingTop: 60,
  },
  pagerView: {
    // marginTop: 45,
    flex: 1,
  },
  tabBar: {
    // flex:1,
    backgroundColor: "#1c1e23",

    // marginBottom: 20,
    // height: 70,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 1.41,

    elevation: 5,
  },
  tab: {
    flex: 1,
    padding: 5,
    paddingBottom: 15,
    paddingTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  tab2: {
    // flex: 1,
    padding: 5,
    // paddingBottom: 15,
    // paddingTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "blue",
  },
  tabIcon: {
    height: 30,
    width: 30,
    marginBottom: 10,
    alignSelf: "center",
  },
  tabText: {
    color: "white",
    fontSize: 11,
    textAlign: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
registerRootComponent(Main);
export default Main;
