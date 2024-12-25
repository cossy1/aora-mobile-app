import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/form-field";
import AppButton from "@/components/app-button";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = () => { }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="justify-center items-center w-full min-h-[80vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-white text-2xl mt-10 font-psemibold">
            Sign In to Aora
          </Text>

          <FormField
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, email: value }))
            }
            value={form.email}
            otherStyles="mt-7"
            title="Email"
            keyboardType='email-address'

          />

          <FormField
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, password: value }))
            }
            value={form.password}
            otherStyles="mt-7"
            title="Password"
          />

          <AppButton
            title="Sign In"
            handlePress={submit}
            containerStyles="w-full mt-8"
          />

          <View className="gap-2 justify-center items-center pt-5 flex-row">
            <Text className="font-pregular text-lg text-gray-100">
              Don't have an account?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href="/(auth)/sign-up"
            >
              Sign Up
            </Link>
          </View>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
