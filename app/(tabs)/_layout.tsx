import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import OnboardingScreen from "./onboarding";

const STORAGE_KEY = "has_launched";
const PRIMARY_COLOR = "#00F0FF"; // Màu Neon Blue của Robot OS

export default function RootLayout() {
  // Onboarding logic: Kiểm tra lần đầu mở app và lưu trạng thái vào SecureStore
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const value = await SecureStore.getItemAsync(STORAGE_KEY);
        setIsFirstLaunch(value === null);
      } catch (error) {
        setIsFirstLaunch(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkStatus();
  }, []);

  const handleOnboardingDone = async () => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEY, "true");
      setIsFirstLaunch(false);
    } catch (error) {
      console.error("Error saving status:", error);
    }
  };

  // 1. Hiệu ứng chờ khi đang kiểm tra bộ nhớ
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    );
  }

  // 2. Nếu là lần đầu mở app -> Hiển thị Onboarding
  if (isFirstLaunch) {
    return <OnboardingScreen onDone={handleOnboardingDone} />;
  }

  // 3. Đã vào App chính -> Cấu hình các Tabs và Icon
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: "#7f8c8d",
        tabBarStyle: {
          backgroundColor: "#16161E", // Dark surface
          borderTopColor: "#252530",
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: "#0D0D12",
        },
        headerTitleStyle: {
          color: "#FFFFFF",
          fontWeight: "bold",
        },
      }}>
      {/* Trang chủ: Dashboard Robot */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarLabel: "Tổng quan",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Trang Cài đặt */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Cấu hình",
          tabBarLabel: "Cài đặt",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Ẩn trang onboarding khỏi thanh điều hướng (nếu nó nằm trong app/) */}
      <Tabs.Screen
        name="onboarding"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0D0D12",
    justifyContent: "center",
    alignItems: "center",
  },
});
