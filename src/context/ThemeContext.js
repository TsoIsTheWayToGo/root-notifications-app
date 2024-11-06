import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved theme preference
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("themePreference");
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      } else {
        setIsDarkMode(systemColorScheme === "dark");
      }
    } catch (error) {
      console.error("Error loading theme preference:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem("themePreference", JSON.stringify(newTheme));
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
