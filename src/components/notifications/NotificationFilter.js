import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Colors from "../../constants/colors";

export default function NotificationFilter({ activeFilter, onFilterChange }) {
  const { isDarkMode } = useTheme();

  const filters = [
    { id: "all", label: "All" },
    { id: "mention", label: "Mentions" },
    { id: "friend_request", label: "Friend requests" },
    { id: "community_invite", label: "Invites" },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? Colors.surfaceColor : "#fff",
          borderBottomColor: isDarkMode ? Colors.border : "#eee",
        },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            activeOpacity={1}
            key={filter.id}
            onPress={() => onFilterChange(filter.id)}
            style={[
              styles.filterButton,
              activeFilter === filter.id && [
                styles.activeFilter,
                { backgroundColor: Colors.primary },
              ],
              {
                backgroundColor: isDarkMode
                  ? activeFilter === filter.id
                    ? Colors.primary
                    : Colors.background
                  : activeFilter === filter.id
                  ? Colors.primary
                  : "#f1f5f9",
              },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.id && styles.activeFilterText,
                {
                  color: isDarkMode
                    ? activeFilter === filter.id
                      ? "#fff"
                      : "#fff"
                    : activeFilter === filter.id
                    ? "#fff"
                    : "#64748b",
                },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#fff",
  },
});
