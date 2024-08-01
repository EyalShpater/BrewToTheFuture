import React, { useEffect, useRef } from "react";
import { View, Animated, Text } from "react-native";
import styles from "./TemperatureBar.style.js";

const TemperatureBar = ({ temperature }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: temperature,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [temperature]);

  const interpolateColor = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["green", "red"],
  });

  const animatedWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.barContainer}>
      <Animated.View
        style={[
          styles.bar,
          { backgroundColor: interpolateColor, width: animatedWidth },
        ]}
      />
      <View style={styles.temperatureTextContainer}>
        <Text style={styles.temperatureText}>{`${temperature}°C`}</Text>
      </View>
    </View>
  );
};

export default TemperatureBar;
