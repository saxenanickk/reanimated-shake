import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useAnimatedShake } from "./hooks/useAnimatedShake";
import { useCallback, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const { shake, rShakeStyles, isShaking } = useAnimatedShake();

  const onDecrement = useCallback(() => {
    setCount((prev) => {
      if (prev === 0) {
        shake();
        return prev;
      }
      return prev - 1;
    });
  }, []);

  const onIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const rCountTextStyle = useAnimatedStyle(() => {
    return {
      color: isShaking.value ? "red" : "black",
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.Text style={[styles.text, rShakeStyles, rCountTextStyle]}>
        {count}
      </Animated.Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onDecrement}>
          <Text style={styles.buttonText}>{"-"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onIncrement}>
          <Text style={styles.buttonText}>{"+"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 90, fontWeight: "bold", color: "black" },
  buttonsContainer: {
    position: "absolute",
    right: 48,
    bottom: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 140,
  },
  button: {
    height: 64,
    aspectRatio: 1,
    backgroundColor: "#111111",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { fontSize: 40, fontWeight: "bold", color: "white" },
});
