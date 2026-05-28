import React, {type FC, useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import Animated, {
  Easing,
  FadeInUp,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import styles from './style';

import WordleLogo from '../../assets/wordle_logo';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic(0.5);

const SplashScreen: FC = () => {
  const rotation = useSharedValue<number>(0);

  const scaleValue = useSharedValue(0.3);

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotation.value}deg`}, {scale: scaleValue.value}],
  }));

  useEffect(() => {
    rotation.value = withSequence(
      // deviate left to start from -ANGLE
      withTiming(-ANGLE, {duration: TIME / 2, easing: EASING}),
      // wobble between -ANGLE and ANGLE 7 times
      withRepeat(
        withTiming(ANGLE, {
          duration: TIME,
          easing: EASING,
        }),
        7,
        true,
      ),
      // go back to 0 at the end
      withTiming(0, {duration: TIME / 2, easing: EASING}),
    );
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.componentBackground}
      />
      <View style={styles.imageContainer}>
        <Animated.View style={[styles.imageContainer, scaleStyles]}>
          <WordleLogo />
        </Animated.View>
        <Animated.Text
          entering={FadeInUp.delay(1000)}
          exiting={FadeOut}
          style={styles.appTypeText}>
          W O R D L E
        </Animated.Text>
        <Animated.Text
          entering={FadeInUp.delay(1000)}
          exiting={FadeOut}
          style={styles.appTypeText}>
          Made With React Native
        </Animated.Text>
      </View>
    </SafeAreaProvider>
  );
};

export default SplashScreen;
