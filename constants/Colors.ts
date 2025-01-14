/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary:'#45cab1',
    secondary:'#18374B',
    tertiary:'#ECA400',
    white : '#F7F0F0',
    gray : '#DBD3D8',
    black : '#0A0A0A'
    
  },
  dark: {
    text: '#F7F0F0',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary:'#eca400',
    secondary:'#18374B',
    tertiary:'#45cab1',
    white : '#F7F0F0',
    gray : '#DBD3D8',
    black : '#0A0A0A'
    

  },
};
