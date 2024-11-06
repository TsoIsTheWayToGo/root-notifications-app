import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  generateMockNotification,
  generateInitialNotifications,
} from "../utils/mockDataGenerator";

const NotificationContext = createContext();
const MAX_NOTIFICATIONS = 100;

function notificationReducer(state, action) {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload.slice(0, MAX_NOTIFICATIONS),
        isLoading: false,
      };

    case "ADD_NOTIFICATION":
      const updatedNotifications = [action.payload, ...state.notifications];
      return {
        ...state,
        notifications: updatedNotifications.slice(0, MAX_NOTIFICATIONS),
      };

    case "MARK_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };

    case "MARK_ALL_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
      };

    case "RELOAD_NOTIFICATIONS":
      return {
        ...state,
        notifications: [...state.notifications],
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case "CLEAR_ALL":
      return {
        ...state,
        notifications: [],
      };

    default:
      return state;
  }
}

export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
    isLoading: true,
    error: null,
  });
  const [isGeneratingEnabled, setIsGeneratingEnabled] = useState(true);

  // Load initial notifications
  useEffect(() => {
    loadNotifications();
  }, []);

  // Save notifications when they change
  useEffect(() => {
    if (!state.isLoading) {
      saveNotifications();
    }
  }, [state.notifications]);

  // Generate new notifications periodically
  useEffect(() => {
    if (!isGeneratingEnabled) return;

    const interval = setInterval(() => {
      try {
        const newNotification = generateMockNotification();
        dispatch({ type: "ADD_NOTIFICATION", payload: newNotification });
      } catch (error) {
        console.error("Error generating notification:", error);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isGeneratingEnabled]);

  const loadNotifications = async () => {
    try {
      const savedNotifications = await AsyncStorage.getItem("notifications");
      if (savedNotifications) {
        const parsedNotifications = JSON.parse(savedNotifications);
        dispatch({
          type: "SET_NOTIFICATIONS",
          payload: parsedNotifications,
        });
      } else {
        // Load initial mock data if no saved notifications
        const initialNotifications = generateInitialNotifications(20); // Start with 20 notifications
        dispatch({
          type: "SET_NOTIFICATIONS",
          payload: initialNotifications,
        });
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to load notifications",
      });
    }
  };

  const saveNotifications = async () => {
    try {
      await AsyncStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  };

  // Debug function to clear AsyncStorage (only during development)
  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log("AsyncStorage has been cleared.");
  //   } catch (e) {
  //     console.error("Failed to clear AsyncStorage:", e);
  //   }
  // };

  return (
    <NotificationContext.Provider
      value={{
        state,
        dispatch,
        isGeneratingEnabled,
        setIsGeneratingEnabled,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}
