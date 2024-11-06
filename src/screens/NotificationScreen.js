import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NotificationItem from "../components/notifications/NotificationItem";
import NotificationFilter from "../components/notifications/NotificationFilter";
import NotificationModal from "../components/notifications/NotificationModal";
import ThemeToggle from "../components/theme/ThemeToggle";
import { useNotifications } from "../context/NotificationContext";
import { useTheme } from "../context/ThemeContext";
import Colors from "../constants/colors";



const SectionHeader = React.memo(({ date, isDarkMode }) => (
  <Text
    style={[
      styles.sectionHeader,
      { color: isDarkMode ? Colors.textSecondary : "#64748b" },
      { backgroundColor: isDarkMode ? Colors.surfaceColor : "#E8E6E6" },
    ]}
  >
    {date}
  </Text>
));

const EmptyState = React.memo(({ activeFilter, isDarkMode }) => {
  console.log(activeFilter)
  return ( <View style={styles.emptyContainer}>
    <Ionicons
      name="notifications-off"
      size={48}
      color={isDarkMode ? Colors.textDim : "#ccc"}
    />
    <Text
      style={[
        styles.emptyText,
        { color: isDarkMode ? Colors.textDim : "#666" },
      ]}
    >
      No {activeFilter === "all" ? "" : activeFilter.split('_').join(' ')} notifications
    </Text>
  </View>)
 
});

const NotificationSection = React.memo(
  ({ section, isDarkMode, onNotificationPress }) => (
    <View>
      <SectionHeader date={section.date} isDarkMode={isDarkMode} />
      {section.data.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onPress={() => onNotificationPress(notification.id)}
        />
      ))}
    </View>
  ),
  (prevProps, nextProps) => {
    return (
      prevProps.section.date === nextProps.section.date &&
      prevProps.isDarkMode === nextProps.isDarkMode &&
      prevProps.section.data.length === nextProps.section.data.length &&
      prevProps.section.data.every(
        (item, index) =>
          item.id === nextProps.section.data[index].id &&
          item.read === nextProps.section.data[index].read
      )
    );
  }
);

export default function NotificationScreen({ navigation }) {
  const { state, dispatch } = useNotifications();
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <ThemeToggle />,
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") {
      return state.notifications;
    }
    return state.notifications.filter(
      (notification) => notification.type === activeFilter
    );
  }, [state.notifications, activeFilter]);

  const groupedNotifications = useMemo(() => {
    const groups = filteredNotifications.reduce((acc, notification) => {
      const date = new Date(notification.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let groupKey;
      if (date.toDateString() === today.toDateString()) {
        groupKey = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = "Yesterday";
      } else {
        groupKey = date.toLocaleDateString();
      }

      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(notification);
      return acc;
    }, {});

    return Object.entries(groups).map(([date, data]) => ({
      date,
      data,
    }));
  }, [filteredNotifications]);

  const handleNotificationPress = useCallback(
    (id) => {
      dispatch({ type: "MARK_AS_READ", payload: id });
    },
    [dispatch]
  );

  const handleMarkAllRead = useCallback(() => {
    dispatch({ type: "MARK_ALL_AS_READ" });
    setModalVisible(false);
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch({ type: "RELOAD_NOTIFICATIONS" });
    } catch (error) {
      console.error("Error reloading notifications:", error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item: section }) => (
      <NotificationSection
        section={section}
        isDarkMode={isDarkMode}
        onNotificationPress={handleNotificationPress}
      />
    ),
    [isDarkMode, handleNotificationPress]
  );

  const keyExtractor = useCallback((item) => item.date, []);

  const getItemLayout = useCallback((data, index) => {
    const itemHeight = 80; // Height of a notification item
    const headerHeight = 32; // Height of date header
    return {
      length: itemHeight + headerHeight,
      offset: (itemHeight + headerHeight) * index,
      index,
    };
  }, []);
  if (state.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? Colors.background : "#fff" },
      ]}
    >
      <NotificationFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <FlatList
        data={groupedNotifications}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        maxToRenderPerBatch={5}
        windowSize={3}
        removeClippedSubviews={true}
        initialNumToRender={7}
        updateCellsBatchingPeriod={50}
        onEndReachedThreshold={0.5}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 1,
        }}
        contentContainerStyle={styles.listContent} // Add this prop
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
            progressBackgroundColor={
              isDarkMode ? Colors.surfaceColor : "#ffffff"
            }
          />
        }
        ListEmptyComponent={
          <EmptyState activeFilter={activeFilter} isDarkMode={isDarkMode} />
        }
      />
      <NotificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onMarkAllRead={handleMarkAllRead}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
  },
  headerButton: {
    marginLeft: 16,
    padding: 8,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 16, // Add some bottom padding
  },
});
