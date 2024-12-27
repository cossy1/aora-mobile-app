import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/form-field";
import AppButton from "@/components/app-button";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/global-provider";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);

  const { setUser, setIsLoggedIn } = useGlobalContext()

  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert('Error', 'Please fill all fields')
    }

    else {
      setLoading(true);

      try {
        const result = await createUser(form.email, form.password, form.username);
        setUser(result);
        setIsLoggedIn(true);

        router.replace('/(tabs)')
      } catch (error: any) {
        throw new Error(error);
      }
      finally {
        setLoading(false);
      }
    }

  };

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
            Sign Up to Aora
          </Text>

          <FormField
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, email: value }))
            }
            value={form.email}
            otherStyles="mt-7"
            title="Email"
            keyboardType="email-address"
          />

          <FormField
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, username: value }))
            }
            value={form.username}
            otherStyles="mt-7"
            title="Username"
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
            title="Sign Up"
            handlePress={submit}
            containerStyles="w-full mt-8"
            isLoading={loading}
          />

          <View className="gap-2 justify-center items-center pt-5 flex-row">
            <Text className="font-pregular text-lg text-gray-100">
              Already have an account?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href="/(auth)/sign-in"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
