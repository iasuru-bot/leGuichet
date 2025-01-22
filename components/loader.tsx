import React, { useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

const Loader = () => {
  // Create animation values for each square
  const primaryColor = useThemeColor({}, 'primary');
  const square1Animation = new Animated.Value(0);
  const square2Animation = new Animated.Value(0);
  const square3Animation = new Animated.Value(0);
  const square4Animation = new Animated.Value(0);

  // Function to animate squares in sequence with a 3 second delay between each animation
  const startAnimations = () => {
    Animated.sequence([
      // First forward animation (appear)
      Animated.timing(square1Animation, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(square2Animation, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(square3Animation, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(square4Animation, { toValue: 1, duration: 500, useNativeDriver: true }),

      // Inverse animation (disappear), reverse the values for each square
      Animated.timing(square4Animation, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(square3Animation, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(square2Animation, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(square1Animation, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => {
      // Reset all animations and restart the sequence
      square1Animation.setValue(0);
      square2Animation.setValue(0);
      square3Animation.setValue(0);
      square4Animation.setValue(0);
      startAnimations(); // Restart the sequence
    });
  };

  useEffect(() => {
    startAnimations(); // Start the animation when the component mounts
  }, []);

  const getSquareStyle = (animation: Animated.Value) => ({
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.75, 1],
        }),
      },
    ],
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.wrapper}>
        <View style={styles.loadingspinner}>
          <Animated.View style={[styles.square, { left: 0, top: 0, backgroundColor: primaryColor }, getSquareStyle(square1Animation)]} />
          <Animated.View style={[styles.square, { left: 0, top: 20, backgroundColor: primaryColor }, getSquareStyle(square2Animation)]} />
          <Animated.View style={[styles.square, { left: 0, top: 40, backgroundColor: primaryColor }, getSquareStyle(square3Animation)]} />
          <Animated.View style={[styles.square, { left: 0, top: 60, backgroundColor: primaryColor }, getSquareStyle(square4Animation)]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Translucent gray background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingspinner: {
    width: 120,
    height: 120,
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  square: {
    width: 26,
    height: 26,
    borderRadius: 2,
    margin: 0,
  },
});

export default Loader;