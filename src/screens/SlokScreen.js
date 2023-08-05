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
import * as Speech from "expo-speech";

import colors from "../config/colors";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Entypo } from "@expo/vector-icons";

export default function SlokScreen() {
  const navigation = useNavigation();
  const { chapterNumber, verseNumber } = useRoute().params;
  const { data, loading, error } = useFetch(
    `/slok/${chapterNumber}/${verseNumber}/`
  );

  const [language, setLanguage] = useState("en");
  const [isSpeaking, setIsSpeaking] = useState(false);

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
      const chapterInfo = `Chapter ${chapterNumber} Verse ${verseNumber}`;
      Speech.speak(chapterInfo, {
        voice: "en-in-x-ene-local",
        language: "en-IN",
        pitch: 1,
        rate: 0.6,
      });
      Speech.speak(data?.purohit?.et, {
        voice: "en-in-x-ene-local",
        language: "en-IN",
        pitch: 1,
        rate: 0.75,
        onDone: () => {
          setIsSpeaking(false);
        },
      });
    } else {
      Speech.speak(data?.purohit?.et, {
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://t4.ftcdn.net/jpg/05/70/00/45/360_F_570004501_XI1NUgenio5NlGnjOHyamP8hykzjSsN5.jpg",
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.chapterAndVerseTitle}>
          {language === "en"
            ? `Chapter ${chapterNumber} Verse ${verseNumber}`
            : `अध्याय ${chapterNumber} श्लोक ${verseNumber}`}
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.slok}>
              {language === "hi" ? data?.slok : data?.transliteration}
            </Text>

            <View style={styles.underline} />

            {language === "en" ? (
              <Text style={styles.translation}>{data?.purohit?.et}</Text>
            ) : (
              <Text style={styles.translation}>{data?.chinmay?.hc}</Text>
            )}

            <View style={styles.spacer} />
          </View>
        )}
      </ScrollView>
      {!loading && (
        <>
          <TouchableOpacity
            onPress={isSpeaking ? stopSpeaking : speakSummary}
            style={styles.speakButton}
          >
            <Entypo
              name={isSpeaking ? "controller-stop" : "controller-play"}
              size={totalSize(3)}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLanguage(language === "en" ? "hi" : "en")}
            style={styles.languageButton}
          >
            <Entypo
              name="language"
              size={totalSize(2.5)}
              color={colors.white}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width(5),
    paddingTop: height(3),
    backgroundColor: colors.white,
  },
  imageContainer: {
    width: "100%",
    height: height(30),
    borderRadius: width(2),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: width(2),
  },
  chapterAndVerseTitle: {
    fontSize: totalSize(1.7),
    fontWeight: "bold",
    color: colors.tika,
    fontFamily: "serif",
    marginTop: height(2),
    marginBottom: height(2),
  },
  infoContainer: {},
  slok: {
    fontSize: totalSize(2.3),
    fontWeight: "bold",
    color: colors.primary,
    fontFamily: "serif",
    textAlign: "center",
  },
  underline: {
    width: "100%",
    height: 0.5,
    backgroundColor: colors.gray,
    marginVertical: height(2),
  },
  translation: {
    fontSize: totalSize(1.8),
    fontFamily: "serif",
  },
  speakButton: {
    position: "absolute",
    bottom: height(10),
    right: width(5),
    width: totalSize(5),
    height: totalSize(5),
    borderRadius: totalSize(5),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  languageButton: {
    position: "absolute",
    bottom: height(3),
    right: width(5),
    width: totalSize(5),
    height: totalSize(5),
    borderRadius: totalSize(5),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  spacer: {
    paddingBottom: height(15),
  },
});
