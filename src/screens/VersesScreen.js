import { View, Text, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { SvgUri } from "react-native-svg";

import colors from "../config/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import useFetch from "../hooks/useFetch";

export default function VersesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { chapterNumber } = route.params;

  const { data, loading, error } = useFetch(`/`);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}></View>
      <Text>VersesScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backfaceVisibility: colors.white,
  },
  imageContainer: {
    width: "100%",
    height: height(30),
    alignItems: "center",
    justifyContent: "center",
  },
});
