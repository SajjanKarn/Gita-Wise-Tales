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
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
import { generateRandomChapter, generateRandomVerse } from "../utils/random";
import useFetch from "../hooks/useFetch";
import Chapter from "../components/Chapter";
import { useState } from "react";

export default function ChaptersScreen() {
  const navigation = useNavigation();
  const homeThumbnail = [
    "https://t4.ftcdn.net/jpg/05/75/84/99/360_F_575849931_j0h5pEWF8XMd9OhGZhbODPL1ELaMQR75.jpg",
    "https://t4.ftcdn.net/jpg/05/75/84/99/360_F_575849931_j0h5pEWF8XMd9OhGZhbODPL1ELaMQR75.jpg",
    "https://t4.ftcdn.net/jpg/05/75/84/99/360_F_575849931_j0h5pEWF8XMd9OhGZhbODPL1ELaMQR75.jpg",
    "https://vedicfeed.com/wp-content/uploads/2018/07/Lessons-from-Mahabharata-e1491580856181.jpg",
  ];
  const [thumbnail, setThumbnail] = useState(
    homeThumbnail[Math.floor(Math.random() * homeThumbnail.length)]
  );
  const { data, loading, error } = useFetch(`/chapters`);
  const {
    data: slok,
    loading: slokLoading,
    error: slokError,
  } = useFetch(`/slok/${generateRandomChapter()}/${generateRandomVerse()}/`);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="default" />

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: thumbnail,
          }}
          style={styles.image}
        />
      </View>
      {slokLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <View style={styles.slokOfTheDayContainer}>
          <Text style={styles.slokOfTheDayTitle}>Slok of the day</Text>

          <View style={styles.slokOfTheDay}>
            <Text style={styles.slokOfTheDayText}>{slok?.slok}</Text>
            <Text style={styles.translation}>{slok?.purohit?.et}</Text>
          </View>

          <View style={styles.underline} />
        </View>
      )}
      <View style={styles.container_fluid}>
        <Text style={styles.headerTitle}>Chapters</Text>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : error ? (
          <Text>Something wen't wrong</Text>
        ) : (
          data?.length > 0 &&
          data?.map((chapter) => (
            <Chapter
              key={chapter.chapter_number}
              chapter={chapter}
              onPress={() =>
                navigation.navigate("VersesScreen", {
                  chapterNumber: chapter.chapter_number,
                  totalVerses: chapter.verses_count,
                })
              }
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  slokOfTheDayContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingTop: height(2),
    paddingHorizontal: width(5),
  },
  slokOfTheDayTitle: {
    fontSize: totalSize(2.5),
    fontFamily: "serif",
  },
  slokOfTheDay: {
    alignItems: "center",
    justifyContent: "center",
  },
  slokOfTheDayText: {
    marginTop: height(1),
    color: colors.primary,
    textAlign: "center",
  },
  translation: {
    marginTop: height(1),
    color: colors.tika,
    textAlign: "center",
    fontFamily: "serif",
  },
  underline: {
    width: "100%",
    height: 1,
    backgroundColor: colors.secondary,
    marginTop: height(2),
  },
  headerTitle: {
    fontSize: totalSize(2.5),
    letterSpacing: 1,
    marginTop: height(2),
    fontFamily: "serif",
  },
});
