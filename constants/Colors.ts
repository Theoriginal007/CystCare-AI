/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#A3327A'; // Deep magenta
const tintColorDark = '#F4D3E5'; // Light pink

export const Colors = {
  light: {
    text: '#A3327A', // Deep magenta for text
    background: '#F4D3E5', // Light pink background
    tint: tintColorLight,
    icon: '#A3327A',
    tabIconDefault: '#B85A92', // Lighter magenta for inactive tabs
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F4D3E5', // Light pink text for dark mode
    background: '#2D1B2E', // Dark purple background
    tint: tintColorDark,
    icon: '#F4D3E5',
    tabIconDefault: '#D1A3C9', // Muted pink for inactive tabs
    tabIconSelected: tintColorDark,
  },
};
