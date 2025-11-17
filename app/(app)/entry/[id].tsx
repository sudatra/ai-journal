
import { JOURNAL_ENTRY_BY_ID_QUERYResult } from '@/sanity/sanity.types';
import { useUser } from '@clerk/clerk-expo';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'tamagui'

const EntryScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useUser();
  const [entry, setEntry] = useState<JOURNAL_ENTRY_BY_ID_QUERYResult>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <View>
      <Text>EntryScreen</Text>
    </View>
  )
}

export default EntryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    padding: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 15,
    color: "#6b7280",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: "#904BFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  backButtonTop: {
    paddingVertical: 8,
  },
  backButtonTopText: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "500",
  },
  timeText: {
    fontSize: 13,
    color: "#9ca3af",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});