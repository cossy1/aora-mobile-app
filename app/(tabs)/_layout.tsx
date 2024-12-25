import { Tabs, Redirect } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, Platform, Text, View } from "react-native";
import { icons } from "../../constants";

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  focused: boolean;
  name: string;
}

const TabIcon = ({ icon, color, focused, name }: TabIconProps) => {
  return (
    <View className="flex justify-center items-center gap-y-2">
      <Image
        source={icon}
        tintColor={color}
        resizeMode="contain"
        className="size-6"
        height={24}
        width={24}
      />

      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs w-full`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffa001",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
          paddingTop: 16
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              focused={focused}
              name="Home"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              focused={focused}
              name="Bookmark"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              focused={focused}
              name="Create"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              focused={focused}
              name="Profile"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
