import { useState, useEffect } from "react";
import * as React from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
export default function CreateOrRestoreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        ></Image>

        <Text style={styles.textTitle}>Wallet Setup</Text>
        <Text style={styles.textDes}>Your Gateway to X9 ECOSYSTEM</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.btnImportContainer}>
          <Image source={require("../../assets/zoomInadd.png")}></Image>
          <Text style={styles.textImportWallet}>Import Wallet</Text>
        </View>
        <View style={styles.btnCreateContainer}>
          <Image
            // width={20}
            // height={20}
            source={require("../../assets/zoomInadd.png")}
            style={{
              width: 20,
              height: 20,
            }}
          ></Image>
          <Text style={styles.textCreateWallet}>Create Wallet</Text>
        </View>
      </View>
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
  textCreateWallet: {
    color: "#00FF01",
    marginLeft: 10,
    fontWeight: "400",
    fontSize: 18,
  },
  textImportWallet: {
    color: "#000",
    marginLeft: 10,
    fontWeight: "400",
    fontSize: 18,
  },
  textTitle: {
    marginTop: 10,
    color: "white",
    fontSize: 35,
    fontWeight: "700",
  },
  textDes: {
    margin: 10,
    color: "white",
    fontSize: 19,
    fontWeight: "300",
  },

  btnImportContainer: {
    width: 350,
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00FF01",
  },

  btnCreateContainer: {
    margin: 20,
    width: 350,
    flexDirection: "row",
    borderWidth: 1, // Độ rộng của viền (borderWidth)
    borderColor: "#00FF01", // Màu của viền (borderColor)
    borderRadius: 10, // Bán kính của viền (borderRadius) cho góc bo tròn
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
