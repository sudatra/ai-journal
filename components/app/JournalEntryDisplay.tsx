
import { JOURNAL_ENTRY_BY_ID_QUERYResult } from '@/sanity/sanity.types';
import React from 'react'
import { StyleSheet } from 'react-native';
import { Text, View } from 'tamagui'

interface JournalEntryDisplayProps {
  entry: NonNullable<JOURNAL_ENTRY_BY_ID_QUERYResult>;
}

const JournalEntryDisplay = ({ entry }: JournalEntryDisplayProps) => {
  return (
    <View>
      <Text>JournalEntryDisplay</Text>
    </View>
  )
}

export default JournalEntryDisplay

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  header: {
    marginBottom: 32,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  date: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  moodContainer: {
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  categoryTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: "white",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contentContainer: {
    // Container for portable text content
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 28,
    color: "#1f2937",
    marginBottom: 16,
  },
  heading1: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 16,
    marginTop: 24,
  },
  heading2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
    marginTop: 20,
  },
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: "#904BFF",
    paddingLeft: 16,
    marginVertical: 16,
    backgroundColor: "transparent",
  },
  blockquoteText: {
    fontSize: 17,
    fontStyle: "italic",
    color: "#6b7280",
    lineHeight: 28,
  },
  bold: {
    fontWeight: "700",
  },
  italic: {
    fontStyle: "italic",
  },
  link: {
    color: "#904BFF",
    textDecorationLine: "underline",
  },
  bulletList: {
    marginVertical: 12,
  },
  numberedList: {
    marginVertical: 12,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bullet: {
    fontSize: 17,
    color: "#6b7280",
    marginRight: 12,
    minWidth: 24,
  },
  listItemContent: {
    flex: 1,
  },
  imageContainer: {
    marginVertical: 24,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 16,
  },
  imageCaption: {
    fontSize: 14,
    color: "#6b7280",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 12,
  },
});