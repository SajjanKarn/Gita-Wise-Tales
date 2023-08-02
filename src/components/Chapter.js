import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import colors from "../config/colors";

export default function Chapter({ chapter }) {
  return (
    <View key={chapter.chapter_number}>
      <TouchableOpacity style={styles.chapter} activeOpacity={0.7}>
        <View style={styles.chapterSubContainer}>
          <View style={styles.chapterNumber}>
            <Text style={styles.chapterNumberText}>
              {chapter.chapter_number}
            </Text>
          </View>
          <View style={styles.chapterTitle}>
            <Text style={styles.chapterTitleText}>{chapter.translation}</Text>
            <View style={styles.verses_container}>
              <FontAwesome5 name="feather-alt" size={14} color={colors.gray} />
              <Text style={styles.totalChapterVerses}>
                {chapter.verses_count} verses
              </Text>
            </View>
          </View>
        </View>
        <Entypo name="chevron-thin-right" size={18} color={colors.gray} />
      </TouchableOpacity>
      <View style={styles.underlined} />
    </View>
  );
}

const styles = StyleSheet.create({
  chapter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height(2),
    paddingVertical: height(1),
  },
  chapterSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chapterNumber: {
    width: width(9),
    height: width(9),
    borderRadius: width(1),
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  chapterNumberText: {
    fontSize: totalSize(1.8),
    color: colors.primary,
  },
  chapterTitle: {
    paddingLeft: width(5),
  },
  chapterTitleText: {
    fontSize: totalSize(1.8),
    fontWeight: "bold",
  },
  verses_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: height(0.5),
  },
  totalChapterVerses: {
    paddingLeft: width(1),
    fontSize: totalSize(1.5),
    color: colors.gray,
  },
  underlined: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#E0E0E0",
    marginTop: height(1),
  },
});
