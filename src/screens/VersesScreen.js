import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import { Entypo } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../config/colors";
import useFetch from "../hooks/useFetch";
import client from "../config/client";

export default function VersesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { chapterNumber, totalVerses } = route.params;
  const [language, setLanguage] = useState("en");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [verses, setVerses] = useState([]);
  const [verseLoading, setVerseLoading] = useState(false);
  const [verseLanguage, setVerseLanguage] = useState("en");
  const [verseLoadingPercent, setVerseLoadingPercent] = useState(0);
  const { data, loading, error } = useFetch(`/chapter/${chapterNumber}`);

  const fetchAllVersesForChapter = async (chapterNumber, totalVerses) => {
    const verses = [];

    for (let i = 1; i <= totalVerses; i++) {
      const response = await client.get(`/slok/${chapterNumber}/${i}`);
      const data = await response.data;
      const { _id, chapter, verse, slok, transliteration } = data;
      setVerseLoadingPercent((i / totalVerses) * 100);
      verses.push({
        _id,
        chapter,
        verse,
        slok,
        transliteration,
      });
    }

    return verses;
  };
  const handleChangeLanguage = () => {
    if (language === "en") {
      setLanguage("hi");
    } else {
      setLanguage("en");
    }
  };

  const speakSummary = async () => {
    const voices = await Speech.getAvailableVoicesAsync();
    console.log(voices);
    const options = {
      // indian english
      voice: "ja-jp-x-htm-network",
      language: "ja-JP",
      pitch: 1,
      rate: 0.75,
    };
    if (language === "en") {
      Speech.speak(data?.meaning.en, {
        voice: "en-in-x-ene-local",
        language: "en-IN",
        pitch: 1,
        rate: 0.75,
      });
      Speech.speak(data?.summary.en, {
        voice: "en-in-x-ene-local",
        language: "en-IN",
        pitch: 1,
        rate: 0.75,
        onDone: () => {
          setIsSpeaking(false);
        },
      });
    } else {
      Speech.speak(data?.summary.hi, {
        voice: "hi-in-x-hid-network",
        language: "hi-IN",
        pitch: 1,
        rate: 0.75,
      });
    }
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setVerseLoading(true);
        const cachedVerses = await AsyncStorage.getItem(
          `chapter_${chapterNumber}`
        );
        if (cachedVerses) {
          setVerses(JSON.parse(cachedVerses));
        } else {
          // Assuming chapterSummaryData contains a field 'totalVerses'
          const versesData = await fetchAllVersesForChapter(
            chapterNumber,
            totalVerses
          );
          setVerses(versesData);

          // Cache the verses locally
          await AsyncStorage.setItem(
            `chapter_${chapterNumber}`,
            JSON.stringify(versesData)
          );
        }
        setVerseLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [chapterNumber]);

  const versesThumbanil = [
    "https://t4.ftcdn.net/jpg/05/75/84/99/360_F_575849931_j0h5pEWF8XMd9OhGZhbODPL1ELaMQR75.jpg",
    "https://t4.ftcdn.net/jpg/05/75/84/99/360_F_575849931_j0h5pEWF8XMd9OhGZhbODPL1ELaMQR75.jpg",
    "https://t4.ftcdn.net/jpg/05/75/84/99/360_F_575849931_j0h5pEWF8XMd9OhGZhbODPL1ELaMQR75.jpg",
    "https://vedicfeed.com/wp-content/uploads/2018/07/Lessons-from-Mahabharata-e1491580856181.jpg",
    "https://img.freepik.com/premium-photo/lord-krishna-ultra-realistic-hyper-realistic-image_933536-4.jpg?w=2000",
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyles}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: versesThumbanil[versesThumbanil.length - 1],
            }}
            style={styles.image}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : error ? (
          <Text>Something wen't wrong</Text>
        ) : (
          <View style={styles.container_fluid}>
            <Text style={styles.chapterNumberText}>
              Chapter: {data?.chapter_number}
            </Text>
            <Text style={styles.headerTitle}>
              {language === "en" ? data?.meaning?.en : data?.meaning.hi}
            </Text>
            <Text style={styles.chapterSummary}>
              {language === "en" ? data?.summary.en : data?.summary.hi}
            </Text>
          </View>
        )}

        {verseLoading ? (
          <View style={styles.verseLoadingContainer}>
            <Text style={styles.verseLoadingText}>
              {verseLoadingPercent.toFixed(2)}% Downloaded
            </Text>

            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <View style={{ ...styles.container_fluid, paddingBottom: height(5) }}>
            <View style={styles.headerContainer}>
              <Text style={styles.verseHeading}>
                {language === "en" ? "Verses" : "श्लोक"}
              </Text>
              <TouchableOpacity
                style={styles.languageButton}
                onPress={handleChangeLanguage}
              >
                <Text style={styles.languageButtonText}>
                  {language === "en" ? "हिंदी" : "English"}
                </Text>
              </TouchableOpacity>
            </View>

            {verses.map((verse, index) => (
              <View key={index} style={styles.verseContainer}>
                <Text style={styles.verseNumber}>{verse?.verse}</Text>
                <Text style={styles.verseText}>
                  {" "}
                  {language === "en" ? verse?.transliteration : verse?.slok}
                </Text>

                <TouchableOpacity
                  style={styles.deepMeaningButton}
                  onPress={() =>
                    navigation.navigate("SlokScreen", {
                      chapterNumber,
                      verseNumber: verse?.verse,
                    })
                  }
                >
                  <Text style={styles.deepMeaningButtonText}>Deep Meaning</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={isSpeaking ? stopSpeaking : speakSummary}
        activeOpacity={0.8}
      >
        <Entypo
          name={`${isSpeaking ? "controller-stop" : "controller-play"}`}
          size={24}
          color={colors.white}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.floatingButton, bottom: height(2) }}
        onPress={handleChangeLanguage}
        activeOpacity={0.8}
      >
        <Entypo name="language" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewStyles: {
    paddingBottom: height(5),
  },

  imageContainer: {
    width: "100%",
    height: height(30),
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container_fluid: {
    paddingTop: height(2),
    paddingHorizontal: width(5),
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: width(5),
    borderBottomRightRadius: width(5),
  },
  chapterNumberText: {
    fontSize: totalSize(1.8),
    fontFamily: "serif",
    color: colors.tika,
  },
  headerTitle: {
    fontSize: totalSize(2.5),
    fontWeight: "bold",
    fontFamily: "serif",
  },
  chapterSummary: {
    fontFamily: "serif",
    fontSize: totalSize(1.6),
    marginTop: height(1),
    color: colors.gray,
    textAlign: "justify",
    lineHeight: height(2.6),
  },

  floatingButton: {
    position: "absolute",
    bottom: height(10),
    right: width(5),
    width: width(12),
    height: width(12),
    borderRadius: width(6),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  // Verses
  verseLoadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height(2),
  },
  verseLoadingText: {
    fontSize: totalSize(1.5),
    fontFamily: "serif",
    color: colors.gray,
    marginBottom: height(1),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height(2),
  },
  languageButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: width(2),
    paddingVertical: height(0.5),
    borderRadius: width(2),
  },
  languageButtonText: {
    fontSize: totalSize(1.5),
    fontFamily: "serif",
    color: colors.white,
  },
  verseHeading: {
    fontSize: totalSize(2.5),
    fontWeight: "bold",
    fontFamily: "serif",
    marginTop: height(2),
    marginBottom: height(1),
  },
  verseContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: height(2),
    paddingHorizontal: width(2),
    borderRadius: width(2),
    elevation: 1,
    marginBottom: height(1),
  },
  verseNumber: {
    fontSize: totalSize(2),
    fontWeight: "bold",
    fontFamily: "serif",
    color: colors.primary,
  },
  verseText: {
    fontSize: totalSize(1.9),
    fontFamily: "serif",
    textAlign: "center",
    marginTop: height(1),
  },
  deepMeaningButtonText: {
    fontSize: totalSize(1.5),
    fontFamily: "serif",
    color: colors.primary,
    paddingVertical: height(1),
  },
});
