
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="language-selection" options={{ headerShown: false }} />
    </Stack>
  );
}
