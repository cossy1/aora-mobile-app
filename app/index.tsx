import { View, ScrollView, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/app-button";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/global-provider";

const App = () => {
    const { isLoggedIn, loading } = useGlobalContext();

    if (!loading && isLoggedIn) {
        return <Redirect href="/(tabs)" />;
    }

    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="flex items-center justify-center  min-h-[85vh] px-4">
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        className="w-[130px] h-[84px]"
                    />
                    <Image
                        source={images.cards}
                        resizeMode="contain"
                        className="w-full max-w-[380px] h-[300px]"
                    />

                    <View className="relative mt-5">
                        <Text className="text-4xl text-white font-bold text-center">
                            Discover Endless Possibilities with{" "}
                            <Text className="text-secondary-200">Aora</Text>
                        </Text>

                        <Image
                            source={images.path}
                            resizeMode="contain"
                            className="absolute w-[136px] h-[15px] -bottom-2 -right-8"
                        />
                    </View>

                    <Text className="text-gray-100 font-pregular mt-7 text-sm text-center">
                        Where creativity meets innovation: embark on a journey of limitless
                        exploration with Aora on the fly 🎉
                    </Text>

                    <AppButton
                        title="Continue with Email"
                        handlePress={() => router.push("/(auth)/sign-in")}
                        containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;
