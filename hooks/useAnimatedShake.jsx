import { useCallback } from "react";
import {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const useAnimatedShake = () => {
  const shakeTranslateX = useSharedValue(0);

  const shake = useCallback(() => {
    const TranslationAmount = 20;
    const timingConfig = {
      duration: 80,
      easing: Easing.bezier(0.35, 0.7, 0.5, 0.7),
    };

    shakeTranslateX.value = withSequence(
      withTiming(TranslationAmount, timingConfig),
      withRepeat(withTiming(-TranslationAmount, timingConfig), 3, true),
      // withTiming(0)
      withSpring(0, {
        mass: 0.5,
      })
    );
  }, []);

  const rShakeStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shakeTranslateX.value,
        },
      ],
    };
  });

  const isShaking = useDerivedValue(() => {
    return shakeTranslateX.value !== 0;
  });

  return { shake, rShakeStyles, isShaking };
};

export { useAnimatedShake };
