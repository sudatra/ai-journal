import React, { useState } from 'react'
import { DailyPrompt } from '@/sanity/sanity.types';
import { useRouter } from 'expo-router';
import { getRandomDailyPrompts } from '@/lib/sanity/dailyPrompts';
import { Card, Spinner, Text, View, XStack, YStack } from 'tamagui';
import { Dimensions, Pressable, ScrollView, StyleSheet } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_SPACING = 16;

const DailyPromptCards = () => {
  const [prompts, setPrompts] = useState<DailyPrompt[]>([]);
  const [loading, setLoading] = useState(false);
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
      pathname: "/",
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
    <YStack
      gap={'$3'}
      mb={'$4'}
    >
      <XStack
        style={{ alignItems: "center", justifyContent: "space-between" }}
        px="$1"
      >
        <Text
          fontSize={'$5'}
          fontWeight={'600'}
          color={'$color12'}
        >
          <Pressable onPress={loadPrompts}>
            <IconSymbol 
              size={20} 
              name="arrow.clockwise" 
              color="#6b7280" 
            />
          </Pressable>
        </Text>
      </XStack>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {
          prompts.map((prompt, index) => (
            <Pressable
              key={prompt._id}
              onPress={() => handlePromptPress(prompt)}
              style={({ pressed }) => [
                styles.cardWrapper,
                { opacity: pressed ? 0.8 : 1 },
                index === 0 && styles.firstCard,
              ]}
            >
              <Card
                elevate
                size="$4"
                bordered
                bg="$background"
                borderColor="$borderColor"
                style={styles.card}
              >
                <YStack 
                  gap="$3" 
                  style={{ height: "100%" }}
                >
                  <XStack 
                    gap="$2" 
                    style={{ alignItems: "center" }}
                  >
                    {prompt.emoji && <Text fontSize="$7">{prompt.emoji}</Text>}
                    {
                      !prompt.emoji && (
                        <IconSymbol
                          size={32}
                          name="lightbulb.fill"
                          color="#f59e0b"
                        />
                      )
                    }
                    <Text
                      fontSize="$5"
                      fontWeight="600"
                      color="$color12"
                      style={{ flex: 1 }}
                      numberOfLines={2}
                    >
                      {prompt.title}
                    </Text>
                  </XStack>

                  <Text
                    fontSize="$4"
                    color="$color11"
                    style={{ flex: 1 }}
                    numberOfLines={4}
                  >
                    {prompt.prompt}
                  </Text>

                  <XStack
                    gap="$2"
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {
                      prompt.category && (
                        <View
                          style={[
                            styles.categoryBadge,
                            prompt.category.color && {
                              backgroundColor: prompt.category.color + "20",
                              borderColor: prompt.category.color,
                            },
                          ]}
                        >
                          <Text
                            fontSize="$2"
                            style={{
                              color: prompt.category.color || undefined,
                            }}
                            fontWeight="500"
                          >
                            {prompt.category.title}
                          </Text>
                        </View>
                      )
                    }

                    <View style={{ flex: 1 }} />

                    <XStack 
                      gap="$1"
                      style={{ alignItems: "center" }}
                    >
                      <IconSymbol
                        size={16}
                        name="pencil.circle.fill"
                        color="#904BFF"
                      />
                      
                      <Text 
                        fontSize="$2" 
                        color="$purple9" 
                        fontWeight="600"
                      >
                        Start Writing
                      </Text>
                    </XStack>
                  </XStack>
                </YStack>
              </Card>
            </Pressable>
          ))
        }
      </ScrollView>

      {
        prompts.length > 1 && (
          <XStack 
            gap="$2" 
            style={{ justifyContent: "center" }} 
            mt="$2"
          >
            {
              prompts.map((_, index) => (
                <View
                  key={index}
                  style={[styles.dot, index === activeIndex && styles.activeDot]}
                />
              ))
            }
          </XStack>
        )
      }
    </YStack>
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