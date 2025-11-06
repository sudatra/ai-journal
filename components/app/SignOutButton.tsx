import { useClerk } from '@clerk/clerk-expo';
import React from 'react';
import { Alert, Text } from 'react-native';
import { Button } from 'tamagui';

export default function SignOutButton() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    Alert.alert(
      "Are you sure that you want to sign out?",
      "This will sign you out of all accounts.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
          }
        }
      ]
    );
  }

  return (
    <Button
      theme={'red'}
      borderColor={'$borderColor'}
      onPress={handleSignOut}
    >
      <Text>Sign out</Text>
    </Button>
  )
}