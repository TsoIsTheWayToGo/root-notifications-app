import React from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import Colors from "../../constants/colors";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [animation] = React.useState(new Animated.Value(isDarkMode ? 1 : 0));

  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: isDarkMode ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [isDarkMode]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 21],
  });

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={1}
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? Colors.primaryDark : "#e5e7eb",
        },
      ]}
    >
      <Animated.View
        style={[
          styles.handle,
          {
            transform: [{ translateX }],
            backgroundColor: isDarkMode ? Colors.primary : "#fff",
          },
        ]}
      >
        <Ionicons
          name={isDarkMode ? "moon" : "sunny"}
          size={14}
          color={isDarkMode ? "#fff" : "#fbbf24"}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 42,
    height: 21,
    borderRadius: 14,
    padding: 2,
    justifyContent: "center",
  },
  handle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
});
