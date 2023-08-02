import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ChaptersScreen from "./src/screens/ChaptersScreen";

export default function App() {
  return <ChaptersScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
