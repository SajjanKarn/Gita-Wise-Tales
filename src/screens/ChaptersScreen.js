import {
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  View,
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

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://pbs.twimg.com/media/ES1eZKMU0AELDVE.png",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.container_fluid}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_fluid: {
    paddingHorizontal: width(5),
    paddingBottom: height(3),
  },
  imageContainer: {
    width: "100%",
    height: height(35),
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: width(15),
  },

  headerTitle: {
    fontSize: totalSize(2.8),
    fontWeight: "bold",
    marginTop: height(2),
  },
});
