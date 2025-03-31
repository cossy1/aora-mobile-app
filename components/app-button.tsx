import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

interface Props {
    title: string;
    handlePress: () => void;
    containerStyles?: string;
    isLoading?: boolean;
    textStyles?: string;
}

const AppButton = ({
    title,
    containerStyles,
    isLoading,
    handlePress,
    textStyles,
}: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`bg-secondary min-h-14 rounded-xl flex justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""
                }`}
            onPress={handlePress}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default AppButton;

const styles = StyleSheet.create({});
