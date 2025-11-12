import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { DailyPrompt } from '@/sanity/sanity.types';
import { useRouter } from 'expo-router';
import { getRandomDailyPrompts } from '@/lib/sanity/dailyPrompts';
import { ScrollEvent } from 'react-native-reanimated';
import { Spinner } from 'tamagui';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_SPACING = 16;

const DailyPromptCards = () => {
  const [prompts, setPrompts] = useState<DailyPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const loadPrompts = async () => {
    try {
      setLoading(true);

      const fetchedPrompts = await getRandomDailyPrompts(3);
      setPrompts(fetchedPrompts);
      setActiveIndex(0);
    }
    catch(error) {
      console.error('Error loading daily prompt: ', error);
    }
    finally {
      setLoading(false);
    }
  }

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_SPACING));

    setActiveIndex(index);
  }

  const handlePromptPress = (prompt: DailyPrompt) => {
    router.push({
      pathname: "/new-entry",
      params: {
        promptTitle: prompt.title,
        promptText: prompt.prompt,
        suggestedMood: prompt.suggestedMood || "",
      },
    });
  };

  if(loading) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner size='small' />
      </View>
    )
  }

  if(prompts.length === 0) {
    return null;
  }

  return (
    <View>
      <Text>DailyPromptCards</Text>
    </View>
  )
}

export default DailyPromptCards

const styles = StyleSheet.create({
  loadingContainer: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: CARD_SPACING / 2,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_SPACING / 2,
  },
  firstCard: {
    marginLeft: 0,
  },
  card: {
    padding: 20,
    height: 180,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#f3f4f6",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#d1d5db",
  },
  activeDot: {
    backgroundColor: "#904BFF",
    width: 20,
  },
});