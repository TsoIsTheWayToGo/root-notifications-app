import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Colors from "../../constants/colors";

export const NotificationContent = ({ notification }) => {
  const { isDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      <NotificationTags notification={notification} />
      <Text
        style={[
          styles.message,
          { color: isDarkMode ? Colors.textPrimary : "#000" },
        ]}
      >
        {notification.content}
      </Text>
      <NotificationTimestamp timestamp={notification.timestamp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    lineHeight: 20,
  },
});
