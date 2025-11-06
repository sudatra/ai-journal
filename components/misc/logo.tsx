import React from 'react'
import { Text, XStack, YStack } from 'tamagui'
import { Feather } from '@tamagui/lucide-icons'

const Logo = ({ hasText = false }: { hasText?: boolean }) => {
  return (
    <YStack
      gap={'$3'}
      style={{ alignItems: 'center' }}
      mb={'$4'}
    >
      <XStack
        bg={'$purple10'}
        p={'$3'}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16
        }}
      >
        <Feather 
          size={20}
          color='white'
        />
      </XStack>

      {
        hasText && (
          <Text
            fontSize='$7'
            fontWeight={'700'}
            color={'$color'}
          >
            AI Journal
          </Text>
        )
      }
    </YStack>
  )
}

export default Logo
