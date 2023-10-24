import * as React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, TextInput, View } from "react-native";
import Constants from "expo-constants";

export default function X9WebView() {
  const [uri, setUri] = React.useState("");
  const [inputUri, setInputUri] = React.useState("");

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <TextInput
        style={styles.inputURL}
        value={inputUri}
        onChangeText={setInputUri}
        onSubmitEditing={() => {
          setUri(inputUri);
        }}
      ></TextInput>
      <WebView style={styles.container} source={{ uri: uri }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  inputURL: {
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    // backgroundColor: "gray",
    color: "white",
    padding: 10,
    margin: 10,
  },
});
