import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions } from "react-native";

import { icons } from "../constants";

interface Props {
  title: string,
  value: string,
  placeholder?: string,
  handleChangeText: (value: string) => void,
  otherStyles?: string,
  keyboardType?: KeyboardTypeOptions
}

const FormField = ({
  title,
  value,
  placeholder,
  keyboardType,
  handleChangeText,
  otherStyles,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base mb-1 text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
          {...props}
        />

        {title.toLowerCase() === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;