import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import Colors from "../../constants/colors";

export default function NotificationModal({ visible, onClose, onMarkAllRead }) {
  const { isDarkMode } = useTheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={.8}
        onPress={onClose}
      >
        <View
          style={[
            styles.modalView,
            {
              backgroundColor: isDarkMode ? Colors.surfaceColor : "#fff",
            },
          ]}
        >
          <TouchableOpacity style={styles.modalItem} onPress={onMarkAllRead}>
            <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color={Colors.primary}
            />
            <Text
              style={[
                styles.modalText,
                { color: isDarkMode ? Colors.textPrimary : "#000" },
              ]}
            >
              Mark all as read
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end", // Aligns the modal to the bottom
    alignItems: "center",
  },
  modalView: {
    margin: 0, // Remove top and bottom margin for a snug fit
    borderRadius: 12,
    padding: 24,
    width: "100%", // Adjust width to cover more space
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  modalText: {
    marginLeft: 12,
    fontSize: 16,
  },
});
