import React, { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "@/components/search-input";
import Trending from "@/components/trending";
import EmptyState from "@/components/empty-state";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import { useAppWrite } from "@/lib/useAppWrite";
import VideoCard from "@/components/video-card";


export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const { data: posts, refetch } = useAppWrite(getAllPosts)
  const { data: latestPosts } = useAppWrite(getLatestPosts)

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className=" bg-primary h-full">
      <FlatList
        data={posts?.documents ?? []}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-gray-100 font-pmedium text-sm">
                  Welcome Back
                </Text>
                <Text className="text-white font-psemibold text-2xl">
                  Cosmas
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full pb-8 pt-5 flex-1">
              <Text className="text-lg mb-3 text-gray-100 font-pregular">
                Latest Videos
              </Text>
              <Trending posts={latestPosts?.documents ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="Be the first person to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
