
import { createJournalEntry } from '@/lib/sanity/journal';
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'tamagui'

const NewEntryScreen = () => {
  const params = useLocalSearchParams();
  const { promptTitle, promptText, suggestedMood } = params;

  const initialData = promptText
    ? {
        title: typeof promptTitle === "string" ? promptTitle : "",
        content: typeof promptText === "string" ? promptText : "",
        mood: typeof suggestedMood === "string" ? suggestedMood : "",
        images: [],
        userId: "",
      }
    : undefined
  ;

  const handleSave = async (entry: {
    title?: string;
    content: string;
    images: { uri: string; caption?: string; alt?: string }[];
    mood: string;
    userId: string;
  }) => {
    try {
      await createJournalEntry(entry);
      router.replace('/(app)/(tabs)/entries');
    }
    catch(error) {
      console.error("Failed to save journal entries: ", error);
      Alert.alert(
        "Error",
        "Failed to save your journal entry. Please try again."
      );
    }
  }

  const handleCancel = () => {
    Alert.alert(
      "Discard Entry?",
      "Are you sure you want to discard this journal entry?",
      [
        { text: "Keep Writing", style: "cancel" },
        { text: "Discard", style: "destructive", onPress: () => router.back() }
      ]
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <JournalEntryForm
          onSave={handleSave}
          onCancel={handleCancel}
          initialData={initialData}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default NewEntryScreen