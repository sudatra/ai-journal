
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native';
import { Card, Text, View } from 'tamagui'
import { IconSymbol } from '../ui/icon-symbol';

const PlusButton = () => {
  const router = useRouter();

  return (
    <Card
      bg="$purple9"
      position="absolute"
      top={-20}
      borderColor="$purple9"
      borderRadius="$10"
      width={60}
      height={60}
      alignSelf="center"
    >
      <Pressable
        onPress={() => router.push('/new-entry')}
        style={({ pressed }) => [
          { opacity: pressed ? 0.8 : 1 },
          styles.plusButtonInner,
        ]}
      >
        <IconSymbol 
          size={24} 
          name="plus" 
          color="white" 
        />
      </Pressable>
    </Card>
  )
}

export default PlusButton

const styles = StyleSheet.create({
  plusButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});