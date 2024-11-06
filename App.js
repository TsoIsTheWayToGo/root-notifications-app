import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { NotificationProvider } from "./src/context/NotificationContext";
import NotificationScreen from "./src/screens/NotificationScreen";
import ThemeToggle from "./src/components/theme/ThemeToggle";
import Colors from "./src/constants/colors";

const Stack = createNativeStackNavigator();

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Notifications"
            component={NotificationScreen}
            options={{
              headerStyle: {
                backgroundColor: isDarkMode
                  ? Colors.surfaceColor
                  : Colors.primary,
              },
              headerTintColor: isDarkMode ? Colors.textPrimary : "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => <ThemeToggle />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </ThemeProvider>
  );
}
