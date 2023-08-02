import {
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import colors from "../config/colors";

import useFetch from "../hooks/useFetch";
import Chapter from "../components/Chapter";

export default function ChaptersScreen() {
  const { data, loading, error } = useFetch(`/chapters`);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="default" />

      <Text style={styles.headerTitle}>Chapters</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : error ? (
        <Text>Something wen't wrong</Text>
      ) : (
        data?.length > 0 &&
        data?.map((chapter) => (
          <Chapter key={chapter.chapter_number} chapter={chapter} />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width(5),
  },

  headerTitle: {
    fontSize: totalSize(3),
    fontWeight: "bold",
    marginTop: height(2),
  },
});
