import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import AnnoncePage from './AnnoncePage';
import { useColorScheme } from '@/hooks/useColorScheme';
import Loader from '@/components/loader';
import { SessionProvider } from './SessionContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import SignUpPage from './SignUpPage';
import LoginForm from './LoginForm';

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

const Stack = createStackNavigator();
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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }} />
          <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }} />
          <Stack.Screen name="Annonce" component={AnnoncePage} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </SessionProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}