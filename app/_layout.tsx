import '../tamagui-web.css'

import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { PortalProvider, TamaguiProvider } from 'tamagui'

import { ModalProvider } from '@/context/ModalContext'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { tamaguiConfig } from '../tamagui.config'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        style="dark" 
        backgroundColor="#ffffff" 
      />

      <ClerkProvider tokenCache={tokenCache}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme='light'>
          <PortalProvider shouldAddRootHost={true}>
            <ModalProvider>
              <ThemeProvider value={DefaultTheme}>
                <Slot />
              </ThemeProvider>
            </ModalProvider>
          </PortalProvider>
        </TamaguiProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  )
}