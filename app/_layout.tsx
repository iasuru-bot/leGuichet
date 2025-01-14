import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import Loader from '@/components/loader';
import { SessionProvider } from './SessionContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);


  useEffect(() => {
    async function prepare() {
      try {
        // Simuler un délai pour le loader
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setShowLoader(false);
        SplashScreen.hideAsync();
        setLoaded(true);
      }
    }

    prepare();
  }, []);

  if (!loaded || showLoader) {
    return <Loader />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SessionProvider>
        <Stack screenOptions={{ headerShown: false }}/>
      </SessionProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}