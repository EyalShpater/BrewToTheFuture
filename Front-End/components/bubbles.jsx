import React, { useEffect } from "react";
import { View, Animated, Easing } from "react-native";
import { Dimensions } from "react-native";
import { COLORS, SIZES } from "../constants";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Bubbles = () => {
  const bubble = Array.from({ length: 10 }).map((_, index) => ({
    id: index.toString(),
    translateX: new Animated.Value(Math.random() * (windowWidth - 100)),
    translateY: new Animated.Value(windowHeight + Math.random() * windowHeight),
    size: Math.random() * 20 + 10,
    delay: index * 1000,
    duration: Math.random() * 8000 + 5000,
  }));

  useEffect(() => {
    bubble.forEach((bubble) => {
      Animated.loop(
        Animated.parallel([
          Animated.timing(bubble.translateY, {
            toValue: -bubble.size * 2, // Adjust the end position as needed
            duration: bubble.duration,
            easing: Easing.linear,
            delay: bubble.delay,
            useNativeDriver: true,
          }),
          Animated.timing(bubble.translateX, {
            toValue: Math.random() * (windowWidth - bubble.size),
            duration: bubble.duration,
            easing: Easing.linear,
            delay: bubble.delay,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      ).start();
    });
  }, []);

  return (
    <View style={{ flex: 1, padding: SIZES.medium }}>
      {bubble.map((bubble) => (
        <Animated.View
          key={bubble.id}
          style={{
            position: "absolute",
            transform: [
              { translateX: bubble.translateX },
              { translateY: bubble.translateY },
            ],
          }}
        >
          <View
            style={{
              width: bubble.size,
              height: bubble.size,
              borderRadius: bubble.size / 2,
              backgroundColor: "rgba(255, 255, 255, 0.6)", // semi-transparent white
              borderWidth: 3,
              borderColor: COLORS.yellow, // lighter border
            }}
          />
        </Animated.View>
      ))}
    </View>
  );
};

export default Bubbles;
