import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { useTheme } from "../../context/ThemeContext";
import Colors from "../../constants/colors";

const Tag = ({ text, type }) => {
  const styles = {
    mention: {
      backgroundColor: "rgba(56, 71, 89, 1)",
      color: "#ffffff",
    },
    channel: {
      backgroundColor: "rgba(255, 182, 64, .8)",
      color: "#ffffff",
    },
    community: {
      backgroundColor: "rgba(58, 91, 81, 1)",
      color: "#ffffff",
    },
  };

  return <Text style={[tagStyles.tag, styles[type]]}>{text}</Text>;
};

const NotificationItem = React.memo(({ notification, onPress }) => {
  const { isDarkMode } = useTheme();

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

  const renderNotificationContent = () => {
    switch (notification.type) {
      case "mention":
        return (
          <View style={styles.messageContainer}>
            <Tag text={`@${notification.sender}`} type="mention" />
            <Text
              style={[
                styles.messageText,
                { color: isDarkMode ? Colors.textPrimary : "#000" },
              ]}
            >
              {" " + (notification.template || "mentioned you in") + " "}
            </Text>
            {notification.channel && (
              <Tag text={`#${notification.channel}`} type="channel" />
            )}
            {notification.message && (
              <Text
                style={[
                  styles.messageText,
                  { color: isDarkMode ? Colors.textPrimary : "#000" },
                ]}
              >
                {': "' + notification.message + '"'}
              </Text>
            )}
          </View>
        );

      case "friend_request":
        return (
          <View style={styles.messageContainer}>
            <Tag text={`@${notification.sender}`} type="mention" />
            <Text
              style={[
                styles.messageText,
                { color: isDarkMode ? Colors.textPrimary : "#000" },
              ]}
            >
              {" sent you a friend request"}
            </Text>
          </View>
        );

      case "community_invite":
        return (
          <View style={styles.messageContainer}>
            <Tag text={`@${notification.sender}`} type="mention" />
            <Text
              style={[
                styles.messageText,
                { color: isDarkMode ? Colors.textPrimary : "#000" },
              ]}
            >
              {" invited you to join "}
            </Text>
            <Tag text={notification.community} type="community" />
          </View>
        );

      case "achievement":
        return (
          <View style={styles.messageContainer}>
            <Text
              style={[
                styles.messageText,
                { color: isDarkMode ? Colors.textPrimary : "#000" },
              ]}
            >
              {notification.message}
            </Text>
          </View>
        );

      default:
        return (
          <Text
            style={[
              styles.messageText,
              { color: isDarkMode ? Colors.textPrimary : "#000" },
            ]}
          >
            {notification.message}
          </Text>
        );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? notification.read
              ? Colors.background
              : Colors.unread
            : notification.read
            ? "#fff"
            : "#f8f8f8",
          borderBottomColor: isDarkMode ? Colors.border : "#eee",
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getIconName(notification.type)}
          size={24}
          color={Colors.primary}
        />
      </View>
      <View style={styles.content}>
        {renderNotificationContent()}
        <Text
          style={[
            styles.timestamp,
            { color: isDarkMode ? Colors.textDim : "#666" },
          ]}
        >
          {formatDistanceToNow(new Date(notification.timestamp), {
            addSuffix: true,
          })}
        </Text>
      </View>
      {!notification.read && (
        <View style={[styles.unreadDot, { backgroundColor: Colors.primary }]} />
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    alignSelf: "center",
    marginLeft: 8,
  },
});

const tagStyles = StyleSheet.create({
  tag: {
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 2,
    overflow: "hidden",
    fontSize: 16,
    fontWeight: "500",
    margin: 2,
  },
});

export default NotificationItem;
