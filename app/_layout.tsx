import '../tamagui-web.css'

import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'

import { ModalProvider } from '@/context/ModalContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { tamaguiConfig } from '../tamagui.config'
import { Slot } from 'expo-router'

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ClerkProvider tokenCache={tokenCache}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
          <ModalProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Slot />
            </ThemeProvider>
          </ModalProvider>
        </TamaguiProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  )
}