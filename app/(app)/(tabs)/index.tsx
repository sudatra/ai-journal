import Logo from '@/components/misc/logo';
import { useStreaks } from '@/hooks/use-streaks';
import { formatUppercaseDate, getTimeOfDayGreeting } from '@/lib/utils/date';
import { getUserFirstName } from '@/lib/utils/user';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, ScrollView, Spinner, Text, View, XStack, YStack } from 'tamagui';

export default function HomeScreen() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    currentStreak,
    longestStreak,
    isActive,
    statusMessage,
    daysUntilNextMilestone,
    nextMilestone,
    isLoading: streaksLoading
  } = useStreaks();

  const now = new Date();
  const formattedDate = formatUppercaseDate(now);
  const greeting = getTimeOfDayGreeting();
  const userName = getUserFirstName(user);

  if(!isLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Spinner size='large' />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        px={'$4'}
        style={{
          ...styles.container,
          paddingTop: insets.top
        }}
      >
        <YStack
          gap={'$2'}
          mt={'$4'}
          mb={'$1.5'}
          style={{ alignItems: 'center' }}
        >
          <Logo />
          <Text
            fontSize={'$2'}
            color={'$color10'}
            fontWeight={'500'}
            textTransform='uppercase'
          >
            {formattedDate}
          </Text>
        </YStack>

        <YStack
          gap={'$2'}
          mb={'$4'}
          style={{ alignItems: 'center' }}
        >
          <Text
            fontSize={'$8'}
            color={'$color12'}
            fontWeight={'600'}
            style={{ alignItems: 'center' }}
          >
            {greeting}, {userName}
          </Text>
        </YStack>

        <XStack
          mb={'$6'}
          style={{justifyContent: 'space-between' }}
        >
          {
            Array.from({ length: 7 }, (_, i) => {
              const startOfWeek = new Date(now);
              startOfWeek.setDate(now.getDate() - now.getDay() + i);

              const dayData = {
                dayName: startOfWeek.toLocaleDateString('en-US', {
                  weekday: 'short'
                }),
                dayNumber: startOfWeek.getDate(),
                isToday: startOfWeek.toDateString() === now.toDateString()
              };

              return (
                <YStack
                  key={i}
                  gap={'$1'}
                  style={{ alignItems: 'center' }}
                >
                  <Text
                    fontSize={'$2'}
                    color={'$color10'}
                    fontWeight={'500'}
                  >
                    {dayData.dayName}
                  </Text>

                  <View
                    style={[
                      styles.dayCircle,
                      dayData.isToday && styles.todayCircle
                    ]}
                  >
                    <Text
                      fontSize={'$3'}
                      color={dayData.isToday ? 'white' : '$color11'}
                      fontWeight={dayData.isToday ? '600' : '400'}
                    >
                      {dayData.dayNumber}
                    </Text>
                  </View>
                </YStack>
              )
            })
          }
        </XStack>

        {
          streaksLoading && (
            <YStack
              gap={'$3'}
              mb={'$6'}
            >
              <Card
                elevate
                size="$4"
                bordered
                bg="$background"
                borderColor="$borderColor"
                padding="$5"
              >
                
              </Card>
            </YStack>
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6b7280",
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    borderColor: "#d1d5db",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  todayCircle: {
    backgroundColor: "#904BFF",
    borderColor: "#904BFF",
  },
  moodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fef3c7",
    justifyContent: "center",
    alignItems: "center",
  },
  quoteContainer: {
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
