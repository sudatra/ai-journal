
import CreateEntryButton from '@/components/app/CreateEntryButton';
import { fetchJournalEntries } from '@/lib/sanity/journal';
import { USER_JOURNAL_ENTRIES_QUERYResult } from '@/sanity/sanity.types';
import { useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View } from 'tamagui'

type JournalEntry = USER_JOURNAL_ENTRIES_QUERYResult[0];

interface GroupedEntries {
  [date: string]: JournalEntry[];
}

const EntriesScreen = () => {
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const [entries, setEntries] = useState<USER_JOURNAL_ENTRIES_QUERYResult>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadEntries = async () => {
    if(!user?.id) {
      return;
    }

    try {
      const fetchedEntries = await fetchJournalEntries(user.id);
      setEntries(fetchedEntries);
    }
    catch(error) {
      console.error("Failed to load journal entries:", error);
    }
    finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadEntries();
  }, [user?.id]);

  const groupEntriesByDate = (entries: USER_JOURNAL_ENTRIES_QUERYResult): GroupedEntries => {
    return entries.reduce((groups: GroupedEntries, entry) => {
      const dateObj = new Date(entry.createdAt ?? new Date());
      const year = dateObj.getUTCFullYear();
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getUTCDate()).padStart(2, "0");
      const dateKey = `${year}-${month}-${day}`;

      if(!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(entry);
      return groups;
    }, {});
  }

  const handleEntryPress = (entryId: string) => {
    router.push(`/entry/${entryId}`);
  }

  if(loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator 
          size={'large'}
          color={'#904BFF'}
        />

        <Text style={styles.loadingText}>
          Loading your journal entries...
        </Text>
      </View>
    )
  }

  if(entries.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyTitle}>
          No Journal Entries Yet
        </Text>

        <Text style={styles.emptySubtitle}>
          Tap the + button to write your first journal entry!
        </Text>

        <CreateEntryButton />
      </View>
    )
  }

  return (
    <View>
      <Text>entries</Text>
    </View>
  )
}

export default EntriesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100, // Space for FAB
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 15,
    color: "#6b7280",
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  dayGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  entryCardContainer: {
    marginBottom: 32,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  entryCard: {
    backgroundColor: "transparent",
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  entryTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
    letterSpacing: -0.3,
  },
  entryActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 12,
  },
  moodLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  entryPreview: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 26,
    marginBottom: 16,
  },
  categoryTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: "white",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});