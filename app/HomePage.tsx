// app/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import NavigationButton from '@/components/navigationButton';

const HomePage = () => {
  const router = useRouter();
  return (
    <View style={styles.wrapper}>
      <View style={styles.form}>
        <Text style={styles.title}>Welcome to Le bon commerce</Text>
        <Text style={styles.message}>Discover, Collect, and Share Virtual Caches!</Text>
        {/* Register Button */}
        <NavigationButton title={'Register'} link={'./SignUpForm'}/>

        {/* Login Button */}
        <NavigationButton title={'Login'} link={'./LoginForm'}/>
        <NavigationButton title={'LP'} link={'./LandingPage'}/>

      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#023047',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderColor: '#333',
    borderWidth: 1,
    alignItems: 'center',
    display:'flex',
    gap:20
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#00bfff',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  }
});

export default HomePage;
