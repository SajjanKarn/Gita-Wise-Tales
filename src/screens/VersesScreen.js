import { useState } from "react";
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

import colors from "../config/colors";
import useFetch from "../hooks/useFetch";

export default function VersesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { chapterNumber } = route.params;
  const [language, setLanguage] = useState("en");

  const { data, loading, error } = useFetch(`/chapter/${chapterNumber}`);

  const handleChangeLanguage = () => {
    if (language === "en") {
      setLanguage("hi");
    } else {
      setLanguage("en");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyles}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-photo/lord-krishna-ultra-realistic-hyper-realistic-image_933536-4.jpg?w=2000",
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
              Summary (
              {language === "en" ? data?.meaning?.en : data?.meaning.hi})
            </Text>
            <Text style={styles.chapterSummary}>
              {language === "en" ? data?.summary.en : data?.summary.hi}
            </Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
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
    paddingBottom: height(3),
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
    bottom: height(2),
    right: width(5),
    width: width(12),
    height: width(12),
    borderRadius: width(6),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
});
