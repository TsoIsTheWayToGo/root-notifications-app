import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

export const NotificationIcon = ({ type }) => {
  const getIconName = (type) => {
    switch (type) {
      case "mention":
        return "at";
      case "friend_request":
        return "person-add";
      case "community_invite":
        return "people";
      case "achievement":
        return "trophy";
      default:
        return "notifications";
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name={getIconName(type)} size={24} color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    justifyContent: "center",
  },
});
