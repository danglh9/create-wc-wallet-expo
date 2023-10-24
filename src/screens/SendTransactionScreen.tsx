import * as React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import MyText from "../component/MyText";

export default function SendTransactionScreen() {
  return (
    <View style={styles.container}>
      <MyText>To</MyText>
      <TextInput style={styles.inputContainer}></TextInput>

      <MyText>Amount</MyText>
      <TextInput style={styles.inputContainer}></TextInput>

      <Button title="SEND"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingLeft: 10,
    flexDirection: "column",
    margin: 20,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    shadowColor: "white", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
    shadowOpacity: 0.4, // Shadow opacity (0 to 1)
    shadowRadius: 5, // Shadow radius (spread)
    elevation: 5,
    width: "80%",
    flex: 1,
  },
  inputContainer: {
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    // backgroundColor: "gray",
    color: "white",
    padding: 10,
    margin: 10,
  },
});
